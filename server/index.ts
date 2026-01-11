import WebSocket from "ws";
import { GoogleGenAI, Modality } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const port = 8081; // Use 8081 to avoid conflict with Next.js
const wss = new WebSocket.Server({ port });

console.log(`[RELAY SERVER] Listening on ws://localhost:${port}`);

wss.on("connection", async (browserSocket) => {
  console.log("[RELAY SERVER] Browser connected");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[RELAY SERVER] Missing GEMINI_API_KEY");
    browserSocket.close();
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  let session: any = null;

  browserSocket.on("message", async (data: any) => {
    try {
      const message = JSON.parse(data.toString());

      // Setup session if not already done
      if (message.type === "setup") {
        const { voicePersona } = message;
        console.log(`[RELAY SERVER] Setting up Gemini Live session with persona: ${voicePersona}`);
        
        session = await ai.live.connect({
          model: "models/gemini-2.5-flash-native-audio-preview-12-2025",
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: voicePersona === 'emma' ? 'Puck' : 'Zephyr',
                }
              }
            },
          },
          callbacks: {
            onopen: () => {
              console.log("[RELAY SERVER] Connected to Gemini Live");
              browserSocket.send(JSON.stringify({ type: "status", status: "connected" }));
            },
            onmessage: (msg: any) => {
              if (msg.serverContent?.modelTurn?.parts) {
                const parts = msg.serverContent.modelTurn.parts;
                for (const part of parts) {
                  if (part.inlineData?.data) {
                    browserSocket.send(JSON.stringify({
                      type: "audio",
                      data: part.inlineData.data
                    }));
                  }
                }
              }
              
              if (msg.serverContent?.interrupted) {
                browserSocket.send(JSON.stringify({ type: "interrupted" }));
              }
            },
            onerror: (err: any) => {
              console.error("[RELAY SERVER] Gemini Error:", err);
              browserSocket.send(JSON.stringify({ type: "error", error: err.message }));
            },
            onclose: () => {
              console.log("[RELAY SERVER] Gemini connection closed");
              browserSocket.send(JSON.stringify({ type: "status", status: "disconnected" }));
            }
          },
        });
        return;
      }

      // Handle audio input
      if (message.type === "audio" && session) {
        session.sendRealtimeInput({
          mediaChunks: [{
            mimeType: "audio/pcm;rate=16000",
            data: message.data,
          }],
        });
        return;
      }

      // Handle text input (e.g. priming)
      if (message.type === "text" && session) {
        session.sendClientContent({
          turns: [{ role: "user", parts: [{ text: message.text }] }],
          turnComplete: true
        });
        return;
      }

    } catch (e) {
      // If parsing fails, it might be raw audio data
      if (session) {
          // In full duplex mode, we might receive raw binary
          // But for this implementation, let's stick to JSON for easier control signaling
      }
    }
  });

  browserSocket.on("close", () => {
    console.log("[RELAY SERVER] Browser disconnected");
    if (session) {
      try { session.close(); } catch(e) {}
    }
  });
});
