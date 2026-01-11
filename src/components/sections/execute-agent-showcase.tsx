"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  Check, 
  X, 
  RefreshCw, 
  Terminal, 
  Layout, 
  Zap, 
  Globe, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from "lucide-react";

const ChatMessage = ({ role, content, delay = 0, isLast = false, children }: { role: 'user' | 'assistant', content?: string, delay?: number, isLast?: boolean, children?: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex w-full mb-6 ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[80%] flex items-start gap-3 ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${role === 'user' ? 'bg-[#4285f4]' : 'bg-white/10 border border-white/10'}`}>
          {role === 'user' ? <div className="text-white text-xs font-bold">U</div> : <Bot size={16} className="text-[#4285f4]" />}
        </div>
        <div className={`relative px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
          role === 'user' 
            ? 'bg-[#4285f4] text-white rounded-tr-none shadow-lg shadow-blue-500/10' 
            : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
        }`}>
          {content}
          {children}
          {role === 'assistant' && isLast && (
             <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: "100%" }} 
               transition={{ duration: 1, delay: delay + 0.5 }}
               className="h-[1px] bg-gradient-to-r from-transparent via-[#4285f4]/50 to-transparent mt-3" 
             />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ExecuteAgentShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const tools = [
    { icon: <Layout size={20} />, name: "UI Design", color: "text-blue-400" },
    { icon: <Globe size={20} />, name: "Deployment", color: "text-emerald-400" },
    { icon: <Zap size={20} />, name: "Automation", color: "text-amber-400" },
    { icon: <Terminal size={20} />, name: "System Setup", color: "text-purple-400" },
  ];

  return (
    <section className="bg-[#000814] py-[100px] lg:py-[140px] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#4285f4] text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            Truly Agent meeting, no manual effort
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[40px] lg:text-[64px] font-normal leading-tight tracking-tight text-white mb-6 uppercase"
          >
            Try <span className="text-gradient-gemini">Agentic Meeting</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Experience the future of coordination. Our EXECUTE AGENT handles the heavy lifting, 
            transforming your vision into actionable plans without a single manual meeting.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-[1000px] mx-auto min-h-[600px] rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(66,133,244,0.1)] border border-white/5 bg-[#000d1a]"
        >
          {/* Sidebar */}
          <div className="absolute left-0 top-0 bottom-0 w-[240px] bg-white/[0.02] border-r border-white/5 hidden lg:flex flex-col p-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-lg bg-[#4285f4] flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="font-medium text-white tracking-tight">Execute Assistant</span>
            </div>
            
            <div className="space-y-6">
              <div className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Available Tools</div>
              <div className="space-y-4">
                {tools.map((tool, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-default group"
                  >
                    <div className={`p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-[#4285f4]/30 transition-all ${tool.color}`}>
                      {tool.icon}
                    </div>
                    <span className="text-sm">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  History
                </motion.button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:ml-[240px] h-full flex flex-col p-6 lg:p-10 relative">
            <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
              <ChatMessage 
                role="user" 
                content="I need a high-converting landing page for my new AI SaaS. It needs to handle lead collection and be ready in 48 hours." 
                delay={0.5} 
              />
              <ChatMessage 
                role="assistant" 
                content="I understand. Based on your requirement for a high-converting AI SaaS landing page with lead collection and a 48h timeline, I've prepared an Execution Plan." 
                delay={1.5}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.6 }}
                className="bg-white/5 border border-[#4285f4]/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-2xl shadow-blue-500/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap size={60} className="text-[#4285f4]" />
                </div>

                <h4 className="text-[#4285f4] font-medium mb-4 flex items-center gap-2">
                  <Bot size={18} />
                  EXECUTION PLAN V1.0
                </h4>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">UI/UX Strategy</div>
                      <div className="text-white/40 text-xs mt-1">Conversion-focused dark theme with interactive AI elements.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Tech Stack</div>
                      <div className="text-white/40 text-xs mt-1">Next.js 15, Tailwind CSS, Framer Motion, Resend for leads.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Timeline</div>
                      <div className="text-white/40 text-xs mt-1">Execution starts immediately. Delivery in 42 hours.</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 rounded-xl bg-[#4285f4] text-white text-[13px] font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    ACCEPT PLAN
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-[13px] font-bold hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} />
                    RECREATE
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    DECLINE
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Input Mockup */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="relative">
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white/30 text-sm flex items-center justify-between">
                  Plan accepted. Proceeding to execution...
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Terminal size={16} className="text-white/40" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#4285f4] flex items-center justify-center">
                      <ArrowRight size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Talk to our Agent */}
        <div className="mt-32 max-w-[1000px] mx-auto">
           <div className="bg-[#001226] border border-white/5 rounded-[40px] p-12 lg:p-20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4285f4]/5 blur-[120px] -mr-48 -mt-48 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                    Real-time Interface
                  </div>
                  <h3 className="text-[32px] lg:text-[48px] font-normal text-white mb-6 leading-tight">
                    Ready to skip the <span className="text-[#4285f4]">Manual Work?</span>
                  </h3>
                  <p className="text-white/50 text-lg max-w-xl">
                    Our agent is standing by. Define your goal, approve the plan, and watch us execute. No meetings required.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 min-w-[280px]">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-black py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-white/10"
                  >
                    Now talk to our agent
                    <ArrowRight size={20} />
                  </motion.button>
                  <p className="text-white/30 text-sm text-center">Powered by Execute Core v2.0</p>
                </div>
              </div>

              {/* Tools visualization below the CTA */}
              <div className="mt-20 pt-12 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {tools.map((tool, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start gap-4">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 ${tool.color}`}>
                      {tool.icon}
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-white font-medium mb-1">{tool.name}</div>
                      <div className="text-white/30 text-xs uppercase tracking-tighter">Automated System</div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ExecuteAgentShowcase;
