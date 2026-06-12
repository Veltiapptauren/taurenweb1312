import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cieloGarments } from "@/lib/cielo-milano";
import { compressImage } from "@/lib/replicate";
import { tryOnHuggingFace } from "@/lib/huggingface";

export const runtime = "nodejs";
export const maxDuration = 180;

type Body = {
  personImageBase64: string;
  productImagePath: string;
  garmentId?: string;
  garmentName?: string;
};

async function loadProductAsDataUri(productImagePath: string): Promise<string> {
  const clean = productImagePath.replace(/^\/+/, "");
  const absolute = path.join(process.cwd(), "public", clean);
  const buf = await fs.readFile(absolute);
  const ext = path.extname(absolute).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!body?.personImageBase64 || !body?.productImagePath) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const productRaw = await loadProductAsDataUri(body.productImagePath);

    const [humanImg, garmImg] = await Promise.all([
      compressImage(body.personImageBase64),
      compressImage(productRaw),
    ]);

    const garment =
      cieloGarments.find((g) => g.id === body.garmentId) ??
      cieloGarments.find((g) => g.productImage === body.productImagePath);

    const garmentDes = body.garmentName ?? garment?.name ?? "fashion garment";

    const imageUrl = await tryOnHuggingFace(humanImg, garmImg, garmentDes);

    return NextResponse.json({ imageUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
