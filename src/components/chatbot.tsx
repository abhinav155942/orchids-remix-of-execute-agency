"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Markdown = ({ content, isUser }: { content: string; isUser: boolean }) => {
  if (isUser) {
    const parts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return (
      <>
        {parts.map((part, i) => {
          if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("*") && part.endsWith("*"))) {
            const text = part.startsWith("**") ? part.slice(2, -2) : part.slice(1, -1);
            return <strong key={i} className="font-normal">{text}</strong>;
          }
          return part;
        })}
      </>
    );
  }

  const lines = content.split("\n");
  const result: React.ReactNode[] = [];
  let currentTable: string[] = [];

  const flushTable = (tableLines: string[], index: number) => {
    if (tableLines.length < 2) return null;
    
    const rows = tableLines.map(line => 
      line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map(cell => cell.trim())
    );

    const filteredRows = rows.filter(row => !row.every(cell => cell.match(/^-+$/) || cell.match(/^:?-+:?$/)));
    if (filteredRows.length === 0) return null;

    const headers = filteredRows[0];
    const dataRows = filteredRows.slice(1);

    return (
      <div key={`table-${index}`} className="my-4 overflow-x-auto border border-black/10 rounded-lg">
        <table className="min-w-full border-collapse text-[12px]">
          <thead>
            <tr className="bg-black/5">
              {headers.map((h, i) => (
                <th key={i} className="border-b border-black/10 p-2 text-left font-normal uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, i) => (
              <tr key={i} className="border-b border-black/5 last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="p-2 align-top whitespace-normal min-w-[100px]">{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("*") && part.endsWith("*"))) {
        const t = part.startsWith("**") ? part.slice(2, -2) : part.slice(1, -1);
        return <strong key={i} className="font-normal text-black">{t}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      currentTable.push(line);
    } else {
      if (currentTable.length > 0) {
        const table = flushTable(currentTable, i);
        if (table) result.push(table);
        currentTable = [];
      }
        if (trimmed) {
          result.push(<p key={i} className="mb-2 last:mb-0 text-[13px] leading-relaxed break-words [overflow-wrap:anywhere]">{renderInline(line)}</p>);
        } else {
        result.push(<div key={i} className="h-2" />);
      }
    }
  });

  if (currentTable.length > 0) {
    const table = flushTable(currentTable, lines.length);
    if (table) result.push(table);
  }

  return <div className="w-full">{result}</div>;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI strategist. How can I help you scale your business today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I encountered a slight technical glitch. Let's try that again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-[calc(100vw-48px)] sm:w-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative max-w-full"
            >
            <Card className="relative border border-black bg-white overflow-hidden rounded-2xl shadow-none">
              <CardHeader className="p-4 bg-black text-white flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-[10px] font-normal uppercase tracking-[0.2em] flex items-center gap-2 ">
                  AI Support
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </Button>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="h-[450px]" viewportRef={scrollRef}>
                  <div className="flex flex-col gap-6 p-6">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex flex-col",
                          m.role === "user" ? "items-end" : "items-start"
                        )}
                      >
                            <div
                              className={cn(
                                "flex gap-3 max-w-full",
                                m.role === "user" ? "flex-row-reverse" : "flex-row"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-1",
                                  m.role === "user" 
                                    ? "bg-black text-white border-black" 
                                    : "bg-white border-black text-black"
                                )}
                              >
                                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                              </div>
                                <div
                                  className={cn(
                                    "p-4 rounded-2xl text-[13px] leading-relaxed overflow-hidden break-words [overflow-wrap:anywhere] min-w-0 flex-1",
                                    m.role === "user"
                                      ? "bg-black text-white rounded-tr-none"
                                      : "bg-white border border-black text-black rounded-tl-none"
                                  )}
                                >
                                <Markdown content={m.content} isUser={m.role === "user"} />
                              </div>
                            </div>
                      </div>
                    ))}
                      {isLoading && (
                        <div className="flex justify-start max-w-full">
                          <div className="flex gap-3 max-w-full flex-row">
                            <div className="w-8 h-8 rounded-lg bg-white border border-black flex items-center justify-center shrink-0 text-black mt-1">
                              <Bot size={14} />
                            </div>
                            <div className="p-4 rounded-2xl bg-white border border-black flex items-center rounded-tl-none min-w-0 flex-1">
                              <Loader2 size={16} className="animate-spin text-black" />
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="p-4 bg-white border-t border-black">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex w-full gap-2 items-center"
                >
                  <Input
                    placeholder="Ask anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow h-11 rounded-xl border-black bg-white text-[13px] focus-visible:ring-1 focus-visible:ring-black transition-all placeholder:text-black/30"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading}
                    className="h-11 w-11 rounded-xl bg-black hover:bg-black/90 text-white shrink-0 transition-transform active:scale-95"
                  >
                    <Send size={16} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center h-16 w-16 rounded-full bg-black text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white",
          isOpen && "rotate-90"
        )}
      >
        {isOpen ? (
          <X size={28} strokeWidth={1.5} />
        ) : (
          <MessageSquare size={28} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
