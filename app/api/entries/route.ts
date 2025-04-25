import { NextResponse } from 'next/server';

let entries: { id: string; url: string; timestamp: number }[] = [];

export async function GET() {
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file') as Blob;

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  const url = `data:audio/webm;base64,${base64}`;

  const entry = {
    id: Date.now().toString(),
    url,
    timestamp: Date.now()
  };

  entries.unshift(entry);
  return NextResponse.json({ success: true });
}
