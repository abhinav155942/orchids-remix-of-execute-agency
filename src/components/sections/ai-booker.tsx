"use client";

import React, { useState } from "react";
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
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AIBooker() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    if (!isStarted) setIsStarted(true);
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Mock AI response
    setTimeout(() => {
      const aiMessage = { 
        role: "assistant", 
        content: "I've analyzed your requirements. Based on our 'Execute' philosophy, here's a plan to build your dream website in record time. Would you like to see the details for Design, Backend, Theme, and AI Support?" 
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <section className="relative min-h-[800px] w-full bg-[#171717] py-20 text-[#e5e5e5] overflow-hidden flex flex-col items-center">
      {/* CTA Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Badge className="bg-[#c97e58] hover:bg-[#b06a4a] text-white px-6 py-2 text-lg font-bold tracking-wider rounded-full shadow-lg shadow-[#c97e58]/20 border-none">
          CHAT AND BUILD IN 5 MIN
        </Badge>
      </motion.div>

      <div className="w-full max-w-4xl px-4 flex-grow flex flex-col">
        {!isStarted ? (
          <div className="flex-grow flex flex-col items-center justify-center mt-20">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#c97e58]/10 flex items-center justify-center">
                   <Sparkles className="w-8 h-8 text-[#c97e58]" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-8 text-white font-serif">
                Sunday session, Abhinav?
              </h1>
            </motion.div>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto mb-20 space-y-8 scrollbar-hide pt-10">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#2f2f2f] rounded-3xl px-6 py-4' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="mb-2">
                       <Sparkles className="w-5 h-5 text-[#c97e58]" />
                    </div>
                  )}
                  <p className={`text-lg leading-relaxed ${msg.role === 'assistant' ? 'font-serif text-[#f0f0f0] text-xl' : 'text-[#e5e5e5]'}`}>
                    {msg.content}
                  </p>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-4 mt-4 text-[#8e8e8e]">
                      <button className="hover:text-white transition-colors"><Copy size={16} /></button>
                      <button className="hover:text-white transition-colors"><ThumbsUp size={16} /></button>
                      <button className="hover:text-white transition-colors"><ThumbsDown size={16} /></button>
                      <button className="hover:text-white transition-colors"><RotateCcw size={16} /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="w-full max-w-3xl mx-auto sticky bottom-10 px-4 md:px-0">
          <div className="relative bg-[#212121] rounded-[2rem] border border-[#333] shadow-2xl p-4 focus-within:border-[#444] transition-all">
            <Textarea 
              placeholder="How can I help you today?"
              className="w-full bg-transparent border-none focus-visible:ring-0 text-lg resize-none min-h-[60px] max-h-[200px] placeholder:text-[#8e8e8e] text-white py-2 px-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="flex items-center justify-between mt-2 px-2">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="rounded-full text-[#8e8e8e] hover:bg-[#2f2f2f] hover:text-white h-10 w-10">
                  <Plus size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-[#8e8e8e] hover:bg-[#2f2f2f] hover:text-white h-10 w-10">
                  <Clock size={20} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="rounded-full text-[#8e8e8e] hover:bg-[#2f2f2f] hover:text-white text-sm font-medium flex gap-1 items-center px-4">
                  Sonnet 4.5 <ChevronDown size={14} />
                </Button>
                <Button 
                  onClick={handleSend}
                  className={`rounded-xl h-10 w-10 p-0 flex items-center justify-center transition-all ${input.trim() ? 'bg-[#c97e58] text-white' : 'bg-[#2f2f2f] text-[#555] cursor-not-allowed'}`}
                >
                  <ArrowUp size={20} strokeWidth={3} />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
             <p className="text-[#666] text-xs">
               Claude can make mistakes. Please double-check responses.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
