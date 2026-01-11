import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDO-oeHcU-QtgsT48jWmt7Pa_bG-VweeW8';

export async function POST(req: NextRequest) {
  try {
    const { text, voice } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: text.substring(0, 500) },
          voice: {
            languageCode: 'en-US',
            name: voice === 'emma' ? 'en-US-Chirp3-HD-Achernar' : 'en-US-Chirp3-HD-Charon',
            ssmlGender: voice === 'emma' ? 'FEMALE' : 'MALE'
          },
          audioConfig: { 
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[TTS] Google TTS error:', errorText);
      return NextResponse.json({ 
        error: 'TTS failed',
        fallbackToWebSpeech: true,
        text: text 
      }, { status: 200 });
    }

    const data = await response.json();
    
    if (!data.audioContent) {
      return NextResponse.json({ 
        error: 'No audio generated',
        fallbackToWebSpeech: true,
        text: text 
      }, { status: 200 });
    }

    const audioBuffer = Buffer.from(data.audioContent, 'base64');
    
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mp3",
      },
    });
  } catch (error: any) {
    console.error("[TTS] Error:", error);
    return NextResponse.json({ 
      error: error.message,
      fallbackToWebSpeech: true,
      text: req.body 
    }, { status: 200 });
  }
}
