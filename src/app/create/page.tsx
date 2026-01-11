"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Plus, 
  Clock, 
  ChevronDown, 
  ArrowUp, 
  MessageSquare, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  Sparkles,
  Wrench,
  Terminal,
  FileUp,
  ChevronLeft,
  ChevronRight,
  Check,
  Code,
  Mic,
  MicOff,
  Volume2,
  Square,
  User,
  X,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGeminiLive } from "@/hooks/use-gemini-live";

const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/17c27023-7d7f-44fd-8195-37b5ec48727a/Gemini_Generated_Image_haomafhaomafhaom-removebg-preview-1768105474542.png?width=8000&height=8000&resize=contain";
const GODADDY_LOGO = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/17c27023-7d7f-44fd-8195-37b5ec48727a/image-1768131897985.png?width=8000&height=8000&resize=contain";
const CHROME_LOGO = "https://www.vectorlogo.zone/logos/google_chrome/google_chrome-icon.svg";
const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/mkjq6jct09kia72c6c7oxvy2a9ogoqre";

const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  const tableRegex = /((?:\|.*\|(?:\n|\r|$))+)/g;
  const parts = text.split(tableRegex);

  return (
    <div className="space-y-4">
      {parts.map((part, i) => {
        if (part.match(/^\|.*\|/m)) {
          const rows = part.trim().split("\n").filter(row => row.includes("|") && !row.includes("---"));
          if (rows.length === 0) return null;
          const headers = rows[0].split("|").filter(cell => cell.trim() !== "").map(cell => cell.trim());
          const bodyRows = rows.slice(1).map(row => 
            row.split("|").filter(cell => cell.trim() !== "").map(cell => cell.trim())
          );
          return (
            <div key={i} className="my-4 overflow-hidden rounded-lg border border-[#333] bg-[#0d0d0d]">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="bg-[#1a1a1a] text-white/50 uppercase tracking-widest font-bold">
                  <tr>{headers.map((h, hi) => (<th key={hi} className="px-4 py-2 border-b border-[#333] font-medium">{h}</th>))}</tr>
                </thead>
                <tbody className="text-[#ccc]">
                  {bodyRows.map((row, ri) => (
                    <tr key={ri} className="border-b border-[#222] hover:bg-white/[0.02] transition-colors">
                      {row.map((cell, ci) => (<td key={ci} className="px-4 py-2"><FormattedTextContent text={cell} /></td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return <FormattedTextContent key={i} text={part} />;
      })}
    </div>
  );
};

const FormattedTextContent = ({ text }: { text: string }) => {
  const inlineParts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return (
    <span>
      {inlineParts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*")) return <strong key={i} className="font-bold text-white">{part.slice(1, -1)}</strong>;
        return part;
      })}
    </span>
  );
};

const CodePreview = ({ content }: { content: string }) => {
  if (!content || typeof content !== 'string') return null;
  const codeBlockRegex = /```(?:html|javascript|css|xml|js)?\s*([\s\S]*?)```/g;
  const matches = Array.from(content.matchAll(codeBlockRegex));
  if (matches.length === 0) return null;
  const combinedCode = matches.map(m => m[1]).join("\n");
  const hasHtml = /<[a-z][\s\S]*>/i.test(combinedCode);
  const hasCss = /(?:[^{}]+\{[^{}]+\})+/i.test(combinedCode);
  const hasJs = /(?:const|let|var|function|=>)/i.test(combinedCode);
  if (!(hasHtml && (hasCss || hasJs))) return null;
  const srcDoc = `<html><head><style>body { margin: 0; padding: 20px; font-family: sans-serif; background: #1a1a1a; color: white; }${matches.filter(m => m[0].includes('css')).map(m => m[1]).join("\n")}</style></head><body>${matches.filter(m => m[0].includes('html') || (!m[0].includes('css') && !m[0].includes('js'))).map(m => m[1]).join("\n")}<script>${matches.filter(m => m[0].includes('js') || m[0].includes('javascript')).map(m => m[1]).join("\n")}</script></body></html>`;
  return (
    <div className="mt-4 border border-[#333] rounded-lg overflow-hidden bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex items-center gap-2"><Code size={12} className="text-[#666]" /><span className="text-[10px] text-[#888] font-medium uppercase tracking-wider">Preview</span></div>
      </div>
      <iframe srcDoc={srcDoc} className="w-full h-[300px] border-none" title="Code Preview" />
    </div>
  );
};

const DeliveryPlanCard = ({ toolResult, content, onApprove, onDecline, onExplain }: { 
  toolResult?: string, 
  content?: string,
  onApprove?: (data: any) => void,
  onDecline?: () => void,
  onExplain?: () => void
}) => {
  const data = toolResult || content;
  if (!data || (!data.includes("Delivery Plan") && !data.includes("Service Blueprint") && !data.includes("[PLAN]"))) return null;
  
  let cleanData = data;
  const planMatch = data.match(/\[PLAN\]([\s\S]*?)\[\/PLAN\]/);
  if (planMatch) {
    cleanData = planMatch[1];
  }

  const priceMatch = cleanData.match(/\$(\d{1,3}(?:,\d{3})*|\d+)/);
  const price = priceMatch ? priceMatch[0] : "$0";
  
  const complexityMatch = cleanData.match(/\*\*Complexity:\*\*\s*(\w+)/);
  const complexity = complexityMatch ? complexityMatch[1] : "Medium";
  
  const timelineMatch = cleanData.match(/\*\*Timeline:\*\*\s*([^\n*]+)/);
  const timeline = timelineMatch ? timelineMatch[1].trim() : "5-7 days";
  
  const deliverables: { task: string; explanation: string }[] = [];
  
  const tableMatch = cleanData.match(/\|[^|]+\|[^|]+\|[\s\S]*?(?=\n\n|\*Note|$)/);
  if (tableMatch) {
    const rows = tableMatch[0].split('\n').filter(row => 
      row.includes('|') && !row.includes('---') && !row.includes('What we do')
    );
    rows.forEach(row => {
      const cells = row.split('|').filter(c => c.trim());
      if (cells.length >= 2) {
        deliverables.push({
          task: cells[0].replace(/\*\*/g, '').trim(),
          explanation: cells[1].replace(/\*\*/g, '').trim()
        });
      }
    });
  }
  
  if (deliverables.length === 0) {
    const deliverablesSection = cleanData.match(/### Deliverables\n([\s\S]*?)(?=\n---|\nNext Steps|$|\[\/PLAN\])/);
    if (deliverablesSection) {
      const items = deliverablesSection[1].split('\n').filter(line => line.trim().startsWith('-'));
      items.forEach(item => {
        const lineContent = item.trim().replace(/^-\s*/, '');
        if (lineContent.includes(':')) {
          const [task, ...exp] = lineContent.split(':');
          deliverables.push({
            task: task.trim(),
            explanation: exp.join(':').trim()
          });
        } else {
          deliverables.push({
            task: lineContent,
            explanation: "Included in delivery scope."
          });
        }
      });
    }
  }

  const isBlueprint = cleanData.includes("Service Blueprint");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="mt-6 relative overflow-hidden rounded-2xl"
    >
      <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c97e58]/10 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
        
        <div className="relative mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c97e58] to-[#a85d3b] flex items-center justify-center shadow-lg shadow-[#c97e58]/20">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {isBlueprint ? "Service Blueprint" : "Delivery Plan"}
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Confirmed & Locked</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{price}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider">Fixed Investment</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-center">
              <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Complexity</div>
              <div className="text-sm font-medium text-white">{complexity}</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-center">
              <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Timeline</div>
              <div className="text-sm font-medium text-white">{timeline}</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-center">
              <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Lead</div>
              <div className="text-sm font-medium text-white">Abhinav</div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div className="relative">
          <h4 className="text-[10px] text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Terminal size={12} />
            What You Get
          </h4>
          <div className="space-y-3">
            {deliverables.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all"
              >
                <div className="w-6 h-6 rounded-md bg-[#c97e58]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-[#c97e58]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white mb-0.5">{item.task}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{item.explanation}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={() => onApprove?.({ price, complexity, timeline, deliverables })}
            className="w-full bg-[#c97e58] hover:bg-[#a85d3b] text-white rounded-xl h-12 font-bold shadow-lg shadow-[#c97e58]/20 border-none transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Check size={16} className="mr-2" /> Approve Plan
          </Button>
          <Button 
            onClick={onExplain}
            variant="outline"
            className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-12 font-semibold transition-all hover:scale-[1.02]"
          >
            <HelpCircle size={16} className="mr-2" /> Recreate (Explain)
          </Button>
          <Button 
            onClick={onDecline}
            variant="ghost"
            className="w-full text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl h-12 font-semibold transition-all"
          >
            <X size={16} className="mr-2" /> Decline
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Volume2 size={12} className="text-white/20" />
            <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Recommended Manual Method</span>
          </div>
          <p className="text-[10px] text-white/30 text-center leading-relaxed">
            Bank Transfer or Invoice-based settlement supported for this execution.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ResearchCard = ({ toolResult }: { toolResult: string }) => {
  if (!toolResult.startsWith("RESEARCH_RESULT:")) return null;
  const parts = toolResult.split(":");
  const type = parts[1];
  const query = parts[2];
  const status = parts[3];
  const source = parts[4];
  const message = parts.slice(5).join(":").split("[LOGO:")[0].trim();
  const logoUrl = toolResult.match(/\[LOGO:(.*?)\]/)?.[1];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="my-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#1a1a1a] shadow-xl"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <Image src={logoUrl} alt={source} width={type === "domain" ? 70 : 18} height={20} className="object-contain" />
          ) : (
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{source}</div>
          )}
          <div className="h-3 w-px bg-white/10" />
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Research Intelligence</div>
        </div>
        <div className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter bg-blue-500/10 text-blue-400 border border-blue-500/20`}>
          VERIFIED
        </div>
      </div>
      <div className="p-4 flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${type === "domain" ? "bg-[#00a63f]/10" : "bg-blue-500/10"}`}>
          {type === "domain" ? <Plus size={20} className="text-[#00a63f]" /> : <Sparkles size={20} className="text-blue-400" />}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white mb-1">{query}</div>
          <div className="text-xs text-white/60 leading-relaxed">{message}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CreatePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [model, setModel] = useState("exe 1.0");
  const [voicePersona, setVoicePersona] = useState<"ander" | "emma">("ander");
  const [isLoading, setIsLoading] = useState(false);
  const [isToolCalling, setIsToolCalling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const HELVETICA_FONT = '"Helvetica Now", "Neue Helvetica", "Helvetica Neue", Helvetica, Arial, sans-serif';

  const {
    start: startGeminiLive,
    stop: stopGeminiLive,
    status: voiceStatus,
    timeLeft,
    isVoiceMode
  } = useGeminiLive({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDO-oeHcU-QtgsT48jWmt7Pa_bG-VweeW8',
    voicePersona
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApprove = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "APPROVE_PLAN",
          ...data,
          timestamp: new Date().toISOString()
        }),
      });
      if (response.ok) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Plan Approved. The blueprint has been transmitted to our execution engine via Make.com. We are now initializing the build process.",
          reasoning: "User approved the delivery plan. Proceeding to execution phase.",
          versions: [{ role: "assistant", content: "Plan Approved. The blueprint has been transmitted to our execution engine via Make.com. We are now initializing the build process.", reasoning: "User approved the delivery plan. Proceeding to execution phase." }],
          currentVersion: 0
        }]);
      }
    } catch (err) {
      console.error("Approval failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    handleSend("I'd like to refine the scope further. Let's pivot and discuss more options.");
  };

  const handleExplain = () => {
    handleSend("Can you recreate this plan and explain it in simpler English with some examples? I need a more detailed breakdown of how this works.");
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;
    if (!isStarted) setIsStarted(true);
    const userMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, { ...userMessage, versions: [userMessage], currentVersion: 0 }]);
    setInput("");
    setIsLoading(true);
    await executeChat([...messages, { ...userMessage, versions: [userMessage], currentVersion: 0 }]);
  };

  const executeChat = async (history: any[]) => {
    setIsLoading(true);
    let currentHistory = [...history];
    try {
      let continueLoop = true;
      let loopCount = 0;
      while (continueLoop && loopCount < 5) {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            messages: currentHistory.map(m => m.versions?.[m.currentVersion] || m).map(m => ({ role: m.role, content: m.content })),
            modelType: model
          }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        if (data.tool_calls && data.tool_calls.length > 0) {
          const toolCall = data.tool_calls[0];
          const toolName = toolCall.function.name;
          setIsToolCalling(true);
          const toolResponse = await fetch("/api/tools/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toolName, toolArgs: JSON.parse(toolCall.function.arguments) }),
          });
          const toolData = await toolResponse.json();
          const toolResult = toolData.result || toolData.error || "Tool execution failed.";
          const toolMessage = { role: "assistant", content: "", isToolCall: true, toolName, toolArgs: toolCall.function.arguments, toolResult };
          setMessages((prev) => [...prev, { ...toolMessage, versions: [toolMessage], currentVersion: 0 }]);
          currentHistory.push({ ...toolMessage, versions: [toolMessage], currentVersion: 0 });
          currentHistory.push({ role: "user", content: `Tool result: ${toolResult}. Please provide your final firm response based on this.`, versions: [{ role: "user", content: `Tool result: ${toolResult}. Please provide your final firm response based on this.` }], currentVersion: 0 });
          setIsToolCalling(false);
          loopCount++;
        } else {
          const aiMessage = { role: "assistant", content: data.content, reasoning: data.reasoning, tag: model === "exe 2.0" ? "Creative" : "Formal" };
          setMessages((prev) => [...prev, { ...aiMessage, versions: [aiMessage], currentVersion: 0 }]);
          continueLoop = false;
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = { role: "assistant", content: "I encountered an error while processing your request. Please try again.", reasoning: "Error occurred during API communication." };
      setMessages((prev) => [...prev, { ...errorMessage, versions: [errorMessage], currentVersion: 0 }]);
    } finally {
      setIsLoading(false);
      setIsToolCalling(false);
    }
  };

  const handleRegenerate = async (index: number) => {
    const historyBefore = messages.slice(0, index);
    setIsLoading(true);
    await executeChat(historyBefore);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setInput(`Uploaded file: ${file.name}. Please analyze this.`);
  };

  return (
    <div className="flex h-screen flex-col bg-[#171717] text-[#e5e5e5] overflow-hidden" style={{ fontFamily: HELVETICA_FONT }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]/50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/"><Image src={LOGO_URL} alt="Execute Logo" width={32} height={32} className="object-contain" /></Link>
          {isVoiceMode && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-mono text-red-400 font-bold">{formatTime(timeLeft)}</span>
              <span className="text-[9px] text-red-400/60 uppercase tracking-wider">
                {voiceStatus === 'connecting' && 'Connecting...'}
                {voiceStatus === 'listening' && 'Listening...'}
                {voiceStatus === 'processing' && 'Processing...'}
                {voiceStatus === 'speaking' && 'Speaking...'}
              </span>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center relative overflow-hidden">
        {!isStarted && !isVoiceMode ? (
          <div className="flex-grow flex flex-col items-center justify-center -mt-24 w-full max-w-2xl px-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center w-full">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-white">Explain your <span className="text-gradient-gemini">dream</span>.</h1>
              </motion.div>
          </div>
        ) : (
          <div className="w-full flex-grow overflow-y-auto mb-20 space-y-6 scrollbar-hide pt-8 pb-4 scroll-smooth px-4 md:px-12">
            {messages.map((msgContainer, i) => {
              const msg = msgContainer.versions?.[msgContainer.currentVersion] || msgContainer;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.role === 'user' ? 'max-w-[80%] bg-[#2f2f2f] rounded-xl px-4 py-2 shadow-sm border border-[#3d3d3d]' : 'w-full'}`}>
                    {msg.role === 'assistant' && !msg.isToolCall && (
                      <div className="mb-4 flex items-center justify-between">
                        <details className="group flex-grow">
                          <summary className="flex items-center gap-2 cursor-pointer list-none text-[10px] text-[#666] hover:text-[#888] transition-colors font-medium uppercase tracking-wider">
                            <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" /><span>Thought Process</span><ChevronDown size={10} className="group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="mt-2 pl-3 border-l border-[#333] text-[11px] text-[#888] font-light leading-relaxed"><FormattedText text={msg.reasoning || "Analyzing..."} /></div>
                        </details>
                        <div className="flex items-center gap-1 text-[10px] text-[#555] font-mono mr-2"><button className="hover:text-white transition-colors"><ChevronLeft size={12} /></button><span>1/1</span><button className="hover:text-white transition-colors"><ChevronRight size={12} /></button></div>
                      </div>
                    )}
                    {msg.isToolCall ? (
                      <div className="mb-4">
                        {msg.toolName === "execute_research" && msg.toolResult?.startsWith("RESEARCH_RESULT:") ? (
                          <ResearchCard toolResult={msg.toolResult} />
                        ) : (
                          <details className="group">
                            <summary className="flex items-center gap-2 cursor-pointer list-none text-[10px] text-[#666] hover:text-[#888] transition-colors font-medium uppercase tracking-wider">
                              <Wrench size={12} className="text-[#666]" />
                              <span>{`${msg.toolName} tool used`}</span>
                              <ChevronDown size={10} className="group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="mt-2 pl-3 border-l border-[#333] text-[10px] text-[#888] font-mono leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-2 rounded">
                              {msg.toolResult}
                            </div>
                          </details>
                        )}
                      </div>
                    ) : (
                          <>
                            <div className={`text-xs leading-relaxed ${msg.role === 'assistant' ? 'text-[#f0f0f0] text-sm' : 'text-[#e5e5e5]'}`}>
                              <FormattedText text={(msg.content || '').replace(/\[PLAN\][\s\S]*?\[\/PLAN\]/g, '').trim()} />
                            </div>
                            {msg.role === 'assistant' && msg.content && <DeliveryPlanCard content={msg.content} onApprove={handleApprove} onDecline={handleDecline} onExplain={handleExplain} />}
                            {msg.role === 'assistant' && msg.content && <CodePreview content={msg.content} />}
                          </>
                        )}
                    {msg.role === 'assistant' && !msg.isToolCall && (
                      <div className="flex items-center gap-3 mt-4 text-[#666]">
                        <button onClick={() => copyToClipboard(msg.content || '', i)} className="hover:text-white transition-colors p-1">{copiedIndex === i ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}</button>
                        <button className="hover:text-white transition-colors p-1"><ThumbsUp size={12} /></button>
                        <button className="hover:text-white transition-colors p-1"><ThumbsDown size={12} /></button>
                        <button onClick={() => handleRegenerate(i)} className="hover:text-white transition-colors p-1"><RotateCcw size={12} /></button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            {isLoading && !isToolCalling && (
              <div className="flex justify-start w-full">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="flex items-center gap-2 text-[10px] text-white font-medium tracking-widest uppercase">
                  <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" /><span>thinking...</span>
                </motion.div>
              </div>
            )}
          </div>
        )}

        <div className="w-full max-w-md mx-auto absolute bottom-6 px-4 md:px-0">
          <div className={`relative bg-[#212121] rounded-lg border shadow-2xl p-1.5 focus-within:border-[#444] transition-all ${isVoiceMode ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.25)]' : 'border-[#333]'}`}>
            {isVoiceMode && (
              <div className="absolute -top-14 left-0 right-0 flex justify-center pointer-events-none">
                <div className="flex gap-1 items-end h-10">
                  {[...Array(12)].map((_, i) => (
                    <motion.div key={i} animate={{ height: voiceStatus === 'speaking' ? [6, 28, 6] : voiceStatus === 'listening' ? [4, 16, 4] : 4, backgroundColor: voiceStatus === 'speaking' ? '#c97e58' : voiceStatus === 'listening' ? '#3b82f6' : '#444' }} transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }} className="w-1.5 rounded-full" />
                  ))}
                </div>
              </div>
            )}
            <Textarea placeholder={isVoiceMode ? (voiceStatus === 'speaking' ? "AI is speaking..." : "Listening...") : "Explain your dream..."} className="w-full bg-transparent border-none focus-visible:ring-0 text-xs resize-none min-h-[38px] max-h-[150px] placeholder:text-[#666] text-white py-1.5 px-2.5 font-light" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} disabled={isVoiceMode} />
            <div className="flex items-center justify-between mt-0.5 px-1.5 pb-0.5">
              <div className="flex items-center gap-1.5">
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                <Button variant="ghost" size="icon" className="rounded-md text-[#666] hover:bg-[#2f2f2f] hover:text-white h-7 w-7" onClick={() => fileInputRef.current?.click()} disabled={isVoiceMode}><FileUp size={14} /></Button>
                <Button variant="ghost" size="icon" className="rounded-md text-[#666] hover:bg-[#2f2f2f] hover:text-white h-7 w-7">{isToolCalling ? <Wrench size={14} className="text-orange-400 animate-spin-slow" /> : <Clock size={14} />}</Button>
              </div>
              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-md text-[#666] hover:bg-[#2f2f2f] hover:text-white text-[10px] font-medium flex gap-1 items-center px-2 h-7 uppercase">
                      <User size={12} /> {voicePersona}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#212121] border border-[#333] text-white rounded-lg min-w-[120px]">
                    <DropdownMenuItem className="hover:bg-[#2f2f2f] cursor-pointer py-1.5 px-2.5 flex justify-between items-center text-[10px]" onClick={() => setVoicePersona("ander")}>
                      <div className="flex flex-col">
                        <span>Ander</span>
                        <span className="text-[7px] text-blue-400 uppercase tracking-tighter">Male Strategist</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#2f2f2f] cursor-pointer py-1.5 px-2.5 flex justify-between items-center text-[10px]" onClick={() => setVoicePersona("emma")}>
                      <div className="flex flex-col">
                        <span>Emma</span>
                        <span className="text-[7px] text-purple-400 uppercase tracking-tighter">Female Strategist</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" className="rounded-md text-[#666] hover:bg-[#2f2f2f] hover:text-white text-[10px] font-medium flex gap-1 items-center px-2 h-7">{model} <ChevronDown size={12} /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#212121] border border-[#333] text-white rounded-lg min-w-[120px]">
                    <DropdownMenuItem className="hover:bg-[#2f2f2f] cursor-pointer py-1.5 px-2.5 flex justify-between items-center text-[10px]" onClick={() => setModel("exe 1.0")}><div className="flex flex-col"><span>exe 1.0</span><span className="text-[7px] text-blue-400 uppercase tracking-tighter">Formal</span></div><span className="text-[8px] bg-[#333] text-[#8e8e8e] px-1 py-0.5 rounded uppercase">Free</span></DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#2f2f2f] cursor-pointer py-1.5 px-2.5 flex justify-between items-center text-[10px]" onClick={() => setModel("exe 2.0")}><div className="flex flex-col"><span>exe 2.0</span><span className="text-[7px] text-purple-400 uppercase tracking-tighter">Creative</span></div><span className="text-[8px] bg-[#333] text-[#8e8e8e] px-1 py-0.5 rounded uppercase">Free</span></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {isVoiceMode && voiceStatus === 'speaking' && (
                  <Button onClick={() => stopGeminiLive()} className="rounded-md h-7 w-7 p-0 flex items-center justify-center bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]"><Square size={12} fill="currentColor" /></Button>
                )}
                
                <Button onClick={isVoiceMode ? stopGeminiLive : startGeminiLive} className={`rounded-md h-7 w-7 p-0 flex items-center justify-center transition-all ${isVoiceMode ? 'bg-red-500 text-white hover:bg-red-600' : 'text-[#666] hover:text-white hover:bg-[#2f2f2f]'}`}>{isVoiceMode ? <MicOff size={14} /> : <Mic size={14} />}</Button>
                <Button onClick={() => handleSend()} disabled={isLoading || !input.trim() || isVoiceMode} className={`rounded-md h-7 w-7 p-0 flex items-center justify-center transition-all ${input.trim() && !isVoiceMode ? 'bg-[#c97e58] text-white' : 'bg-[#2f2f2f] text-[#444] cursor-not-allowed'}`}>{isLoading ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowUp size={14} strokeWidth={3} />}</Button>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 mb-1"><p className="text-[#555] text-[9px] tracking-tight">Execute can make mistakes. Please double-check responses.</p></div>
        </div>
      </main>
    </div>
  );
}
