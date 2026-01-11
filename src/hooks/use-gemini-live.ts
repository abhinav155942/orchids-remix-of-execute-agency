import { useState, useRef, useCallback, useEffect } from 'react';
import {
  GoogleGenAI,
  LiveServerMessage,
  MediaResolution,
  Modality,
  Session,
} from '@google/genai';

interface UseGeminiLiveOptions {
  apiKey: string;
  voicePersona: 'ander' | 'emma';
}

export function useGeminiLive({ apiKey, voicePersona }: UseGeminiLiveOptions) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'processing' | 'speaking'>('idle');
  const [timeLeft, setTimeLeft] = useState(300);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  
  const sessionRef = useRef<Session | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const playNextInQueue = useCallback(async () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) {
      if (audioQueueRef.current.length === 0 && isPlayingRef.current === false && status === 'speaking') {
        setStatus('listening');
      }
      return;
    }

    if (!audioContextRef.current) return;

    isPlayingRef.current = true;
    setStatus('speaking');
    
    const pcmData = audioQueueRef.current.shift()!;
    const float32Data = new Float32Array(pcmData.length);
    for (let i = 0; i < pcmData.length; i++) {
      float32Data[i] = pcmData[i] / 32768.0;
    }

    const buffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
    buffer.getChannelData(0).set(float32Data);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    
    source.onended = () => {
      isPlayingRef.current = false;
      playNextInQueue();
    };

    source.start();
  }, [status]);

  const stop = useCallback(() => {
    setIsVoiceMode(false);
    setStatus('idle');
    setTimeLeft(300);
    
    if (timerRef.current) clearInterval(timerRef.current);
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  const start = useCallback(async () => {
    try {
      setStatus('connecting');
      setIsVoiceMode(true);

      const ai = new GoogleGenAI({
        apiKey: apiKey,
      });

      const model = 'models/gemini-2.5-flash-native-audio-preview-12-2025';

      const config = {
        responseModalities: [Modality.AUDIO],
        mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voicePersona === 'emma' ? 'Puck' : 'Zephyr',
            }
          }
        },
        contextWindowCompression: {
          triggerTokens: '25600',
          slidingWindow: { targetTokens: '12800' },
        },
      };

      const session = await ai.live.connect({
        model,
        config,
        callbacks: {
          onopen: () => {
            console.log('[GEMINI LIVE] Connected');
            setStatus('listening');
            
            // Prime the session with the strategist persona
            session.sendClientContent({
              turns: [{
                role: 'user',
                parts: [{
                  text: `You are a world-class startup strategist and execution lead. 
                  Your mission is to help the user refine their "dream" (startup idea) into a concrete, executable plan.
                  Be direct, insightful, and focused on delivery.
                  Keep your responses concise and high-impact.
                  Speak as if you are in a high-stakes strategy meeting.
                  Start by introducing yourself briefly as the Execute Strategist and ask the user to explain their dream.`
                }]
              }],
              turnComplete: true
            });
          },
          onmessage: (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts) {
              const parts = message.serverContent.modelTurn.parts;
              for (const part of parts) {
                if (part.inlineData?.data) {
                  const base64Data = part.inlineData.data;
                  const binaryString = atob(base64Data);
                  const bytes = new Uint8Array(binaryString.length);
                  for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  const pcmData = new Int16Array(bytes.buffer);
                  audioQueueRef.current.push(pcmData);
                  if (!isPlayingRef.current) {
                    playNextInQueue();
                  }
                }
              }
            }

            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
              setStatus('listening');
            }
          },
          onerror: (e) => {
            console.error('[GEMINI LIVE] WebSocket Error:', e);
            stop();
          },
          onclose: (e) => {
            console.log('[GEMINI LIVE] Connection Closed:', e.reason);
            stop();
          }
        }
      });

      sessionRef.current = session;

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      processor.onaudioprocess = (event) => {
        if (!sessionRef.current || isPlayingRef.current) return;
        
        const inputData = event.inputBuffer.getChannelData(0);
        const int16Data = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        const uint8 = new Uint8Array(int16Data.buffer);
        let binary = '';
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i]);
        }
        const base64 = btoa(binary);
        
        sessionRef.current.sendRealtimeInput({
          mediaChunks: [{
            mimeType: 'audio/pcm;rate=16000',
            data: base64
          }]
        });
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error('[GEMINI LIVE] Start failed:', err);
      stop();
    }
  }, [apiKey, voicePersona, playNextInQueue, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    start,
    stop,
    status,
    timeLeft,
    isVoiceMode
  };
}
