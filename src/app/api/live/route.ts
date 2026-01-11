import { NextRequest } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDO-oeHcU-QtgsT48jWmt7Pa_bG-VweeW8';

export async function POST(req: NextRequest) {
  try {
    const { audio, voicePersona } = await req.json();
    
    const systemPrompt = `You are ${voicePersona === 'emma' ? 'Emma' : 'Ander'}, a professional voice assistant for Execute - an AI agency that builds websites, apps, and automation systems.

PERSONALITY:
- ${voicePersona === 'emma' ? 'Warm, articulate, and empathetic female strategist' : 'Direct, confident, and analytical male strategist'}
- Professional but conversational
- Proactive in understanding client needs

RULES:
- Keep responses under 2-3 sentences unless asked for detail
- Ask clarifying questions to understand the project scope
- Guide users toward actionable next steps
- Be helpful and solution-oriented`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              inlineData: {
                mimeType: 'audio/webm',
                data: audio
              }
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 512,
          },
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[LIVE API] Gemini error:', errorText);
      return Response.json({ error: 'Gemini API error', details: errorText }, { status: 500 });
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't understand that. Could you please repeat?";

    const ttsResponse = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: textResponse },
          voice: {
            languageCode: 'en-US',
            name: voicePersona === 'emma' ? 'en-US-Studio-O' : 'en-US-Studio-Q',
          },
          audioConfig: { 
            audioEncoding: 'MP3',
            speakingRate: 1.05,
            pitch: voicePersona === 'emma' ? 1.0 : -2.0
          },
        }),
      }
    );

    if (!ttsResponse.ok) {
      console.error('[TTS] Error:', await ttsResponse.text());
      return Response.json({ text: textResponse, audio: null });
    }

    const ttsData = await ttsResponse.json();
    return Response.json({ 
      text: textResponse, 
      audio: ttsData.audioContent 
    });

  } catch (error) {
    console.error('[LIVE API] Error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
