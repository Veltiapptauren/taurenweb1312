import { NextResponse } from "next/server";
import { videoFromHuggingFace } from "@/lib/huggingface";

export const runtime = "nodejs";
export const maxDuration = 300;

type Body = {
  imageUrl: string;
  prompt: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!body?.imageUrl) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const videoUrl = await videoFromHuggingFace(body.imageUrl);
    return NextResponse.json({ videoUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
