import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDO-oeHcU-QtgsT48jWmt7Pa_bG-VweeW8';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob || formData.get("audio") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Transcribe the following audio. Return ONLY the transcribed text, nothing else. If no speech is detected, return an empty string." },
              {
                inlineData: {
                  mimeType: 'audio/webm',
                  data: base64Audio
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[STT] Gemini error:', errorText);
      return NextResponse.json({ error: 'Transcription failed', details: errorText }, { status: 500 });
    }

    const data = await response.json();
    const transcribedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    console.log('[STT] Transcribed:', transcribedText);
    
    return NextResponse.json({ text: transcribedText.trim() });
  } catch (error: any) {
    console.error("STT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
