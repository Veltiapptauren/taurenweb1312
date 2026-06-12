const TOKEN = process.env.HF_TOKEN ?? "";
const TRYON_URL = "https://yisol-idm-vton.hf.space";
const VIDEO_URL = "https://multimodalart-stable-video-diffusion.hf.space";
const TRYON_FN = 2;
const VIDEO_FN = 1;

function sessionHash(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function authHeaders(contentType?: string): Record<string, string> {
  const h: Record<string, string> = {};
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  if (contentType) h["Content-Type"] = contentType;
  return h;
}

async function uploadToSpace(spaceUrl: string, dataUri: string, filename: string): Promise<string> {
  const match = dataUri.match(/^data:(.+?);base64,(.+)$/);
  const mime = match ? match[1] : "image/jpeg";
  const b64 = match ? match[2] : dataUri;
  const buf = Buffer.from(b64, "base64");

  const form = new FormData();
  form.append("files", new Blob([buf], { type: mime }), filename);

  const res = await fetch(`${spaceUrl}/upload`, {
    method: "POST",
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    body: form,
  });
  if (!res.ok) throw new Error(`upload ${res.status}`);
  const paths = (await res.json()) as string[];
  if (!paths?.[0]) throw new Error("upload no devolvió path");
  return paths[0];
}

function fileData(path: string, name: string): Record<string, unknown> {
  return { path, orig_name: name, meta: { _type: "gradio.FileData" } };
}

async function queueJob(
  spaceUrl: string,
  fnIndex: number,
  data: unknown[],
  timeoutMs = 240_000,
): Promise<unknown[]> {
  const hash = sessionHash();

  const joinRes = await fetch(`${spaceUrl}/queue/join`, {
    method: "POST",
    headers: authHeaders("application/json"),
    body: JSON.stringify({ data, fn_index: fnIndex, session_hash: hash }),
  });
  if (!joinRes.ok) {
    const t = await joinRes.text();
    throw new Error(`queue/join ${joinRes.status}: ${t.slice(0, 200)}`);
  }

  const sseRes = await fetch(`${spaceUrl}/queue/data?session_hash=${hash}`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!sseRes.ok) throw new Error(`queue/data ${sseRes.status}`);

  const reader = sseRes.body!.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const parts = buf.split("\n\n");
    buf = parts.pop() ?? "";

    for (const chunk of parts) {
      const lines = chunk.split("\n");
      let dataLine = "";
      for (const line of lines) {
        if (line.startsWith("data:")) dataLine = line.slice(5).trim();
      }
      if (!dataLine) continue;
      try {
        const msg = JSON.parse(dataLine) as {
          msg?: string;
          output?: { data?: unknown[]; error?: string | null };
          success?: boolean;
        };
        if (msg.msg === "process_completed") {
          if (!msg.success) {
            throw new Error(msg.output?.error ?? "El espacio HuggingFace no pudo generar el resultado");
          }
          return msg.output?.data ?? [];
        }
      } catch (e) {
        if (e instanceof SyntaxError) continue;
        throw e;
      }
    }
  }
  throw new Error("La conexión al espacio HuggingFace finalizó sin respuesta");
}

function extractUrl(item: unknown, spaceUrl: string): string | null {
  if (typeof item === "string") {
    if (item.startsWith("http") || item.startsWith("data:")) return item;
    if (item.startsWith("/tmp/")) return `${spaceUrl}/file=${item}`;
  }
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.url === "string" && o.url) return o.url;
    if (typeof o.path === "string") {
      const p = o.path;
      if (p.startsWith("http")) return p;
      if (p.startsWith("/tmp/")) return `${spaceUrl}/file=${p}`;
    }
    if (o.video && typeof o.video === "object") {
      return extractUrl(o.video, spaceUrl);
    }
  }
  return null;
}

export async function tryOnHuggingFace(
  humanDataUri: string,
  garmDataUri: string,
  garmentDes: string,
): Promise<string> {
  const [humanPath, garmPath] = await Promise.all([
    uploadToSpace(TRYON_URL, humanDataUri, "human.jpg"),
    uploadToSpace(TRYON_URL, garmDataUri, "garment.jpg"),
  ]);

  const outputs = await queueJob(TRYON_URL, TRYON_FN, [
    { background: fileData(humanPath, "human.jpg"), layers: [], composite: null },
    fileData(garmPath, "garment.jpg"),
    garmentDes,
    true,
    false,
    30,
    42,
  ]);

  if (!outputs.length) throw new Error("Sin respuesta del espacio de try-on");
  const url = extractUrl(outputs[0], TRYON_URL);
  if (url) return url;
  throw new Error("Formato de salida try-on no reconocido");
}

export async function videoFromHuggingFace(imageUrl: string): Promise<string> {
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`No se pudo obtener imagen: ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const dataUri = `data:image/jpeg;base64,${buf.toString("base64")}`;

  const imgPath = await uploadToSpace(VIDEO_URL, dataUri, "tryon.jpg");

  const outputs = await queueJob(VIDEO_URL, VIDEO_FN, [
    fileData(imgPath, "tryon.jpg"),
    42,
    true,
    127,
    6,
  ]);

  if (!outputs.length) throw new Error("Sin respuesta del espacio de video");
  const url = extractUrl(outputs[0], VIDEO_URL);
  if (url) return url;
  throw new Error("Formato de salida video no reconocido");
}
