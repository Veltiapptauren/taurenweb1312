import sharp from "sharp";

const API = "https://api.replicate.com/v1";

export type ReplicatePrediction = {
  id: string;
  status: string;
  output?: unknown;
  error?: string | null;
};

export function getReplicateToken(): string {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error("Falta REPLICATE_API_TOKEN en variables de entorno");
  return token;
}

function authHeaders(extra?: Record<string, string>): Record<string, string> {
  return { Authorization: `Bearer ${getReplicateToken()}`, ...extra };
}

export async function compressImage(input: string, maxPx = 768): Promise<string> {
  const match = input.match(/^data:(.+?);base64,(.+)$/);
  const b64 = match ? match[2] : input;
  const buf = Buffer.from(b64, "base64");

  const compressed = await sharp(buf)
    .resize(maxPx, maxPx, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  return `data:image/jpeg;base64,${compressed.toString("base64")}`;
}

export async function createVersionPrediction(
  version: string,
  input: Record<string, unknown>,
): Promise<ReplicatePrediction> {
  const res = await fetch(`${API}/predictions`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ version, input }),
  });

  const data = (await res.json()) as ReplicatePrediction & { detail?: string };
  if (!res.ok) throw new Error(data.detail ?? (data.error as string) ?? `Replicate error ${res.status}`);
  return data;
}

export async function createModelPrediction(
  model: string,
  input: Record<string, unknown>,
): Promise<ReplicatePrediction> {
  const [owner, name] = model.split("/");
  if (!owner || !name) throw new Error(`Modelo Replicate inválido: ${model}`);

  const res = await fetch(`${API}/models/${owner}/${name}/predictions`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });

  const data = (await res.json()) as ReplicatePrediction & { detail?: string };
  if (!res.ok) throw new Error(data.detail ?? (data.error as string) ?? `Replicate error ${res.status}`);
  return data;
}

export async function getPrediction(id: string): Promise<ReplicatePrediction> {
  const res = await fetch(`${API}/predictions/${id}`, {
    headers: authHeaders(),
  });
  const data = (await res.json()) as ReplicatePrediction & { detail?: string };
  if (!res.ok) throw new Error(data.detail ?? (data.error as string) ?? `Replicate error ${res.status}`);
  return data;
}

export async function waitForPrediction(
  id: string,
  maxMs = 300_000,
  intervalMs = 4000,
): Promise<unknown> {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const pred = await getPrediction(id);
    if (pred.status === "succeeded") return pred.output;
    if (pred.status === "failed" || pred.status === "canceled") {
      throw new Error(typeof pred.error === "string" ? pred.error : "Predicción Replicate fallida");
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error("Timeout esperando Replicate");
}

export function outputToUrl(output: unknown): string {
  if (typeof output === "string") return output;
  if (Array.isArray(output)) {
    const first = output[0];
    if (typeof first === "string") return first;
  }
  throw new Error("Formato de salida Replicate no reconocido");
}
