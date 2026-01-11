"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { 
  Rocket, 
  Zap, 
  Shield, 
  Clock, 
  Check, 
  MessageSquare, 
  Globe, 
  Layout,
  Star
} from "lucide-react";

import { cn } from "@/lib/utils";

const PricingSlider = () => {
  const [amount, setAmount] = useState(1200);
  const [businessInfo, setBusinessInfo] = useState("");
  const [outcome, setOutcome] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOutcome = useCallback(async (val: number, info: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/outcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: val, businessInfo: info }),
      });
      const data = await response.json();
      setOutcome(data.outcome);
      } catch (error) {
        console.error("Error fetching outcome:", error);
        setOutcome("| **feature** | **execution detail** | **priority** |\n| :--- | :--- | :--- |\n| Core Build | High-conversion Next.js landing page | [ICON_ROCKET] **High Performance** |\n| Strategic Content | Conversion-focused copy based on your niche | [ICON_CHECK] **Sales Focused** |\n| Rapid Delivery | Ready to launch in 6 days | [ICON_CLOCK] **Speed** |");
      } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOutcome(amount, businessInfo);
    }, 800);
    return () => clearTimeout(timer);
  }, [amount, businessInfo, fetchOutcome]);

  const renderOutcome = (text: string) => {
    if (!text) return null;

    const lines = text.split("\n").filter(line => line.trim().startsWith("|"));
    if (lines.length < 2) {
      return <div className="whitespace-pre-line text-black/70 leading-relaxed">{text}</div>;
    }

    const rows = lines.map(line => 
      line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map(cell => cell.trim())
    );

    const filteredRows = rows.filter(row => !row.every(cell => cell.match(/^-+$/) || cell.match(/^:?-+:?$/)));

    if (filteredRows.length === 0) return <div className="whitespace-pre-line text-black/70 leading-relaxed">{text}</div>;

    const headers = filteredRows[0];
    const dataRows = filteredRows.slice(1);

    const iconMap: Record<string, React.ReactNode> = {
      "[ICON_ROCKET]": <Rocket className="w-3.5 h-3.5 text-blue-500" />,
      "[ICON_ZAP]": <Zap className="w-3.5 h-3.5 text-yellow-500" />,
      "[ICON_SHIELD]": <Shield className="w-3.5 h-3.5 text-green-500" />,
      "[ICON_CLOCK]": <Clock className="w-3.5 h-3.5 text-purple-500" />,
      "[ICON_CHECK]": <Check className="w-3.5 h-3.5 text-emerald-500" />,
      "[ICON_MESSAGE]": <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />,
      "[ICON_GLOBE]": <Globe className="w-3.5 h-3.5 text-sky-500" />,
      "[ICON_LAYOUT]": <Layout className="w-3.5 h-3.5 text-rose-500" />,
    };

    const parseContent = (content: string) => {
      let elements: (string | React.ReactNode)[] = [content];

      Object.keys(iconMap).forEach(key => {
        const newElements: (string | React.ReactNode)[] = [];
        elements.forEach(el => {
          if (typeof el === "string" && el.includes(key)) {
            const parts = el.split(key);
            parts.forEach((part, i) => {
              newElements.push(part);
              if (i < parts.length - 1) {
                newElements.push(<span key={`${key}-${i}`} className="inline-flex mr-1.5 align-middle">{iconMap[key]}</span>);
              }
            });
          } else {
            newElements.push(el);
          }
        });
        elements = newElements;
      });

      const finalElements: (string | React.ReactNode)[] = [];
      elements.forEach((el, idx) => {
        if (typeof el === "string") {
          const subParts = el.split(/(\*\*.*?\*\*)/g);
          subParts.forEach((subPart, i) => {
            if (subPart.startsWith("**") && subPart.endsWith("**")) {
              finalElements.push(<span key={`${idx}-${i}`} className="text-black font-normal whitespace-nowrap">{subPart.slice(2, -2)}</span>);
            } else if (subPart !== "") {
              finalElements.push(subPart);
            }
          });
        } else {
          finalElements.push(el);
        }
      });

      return finalElements;
    };

    return (
      <div className="-mx-4 sm:mx-0 overflow-x-auto scrollbar-hide">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-separate border-spacing-0 text-[13px]">
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className={cn(
                    "sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur-sm py-3 px-4 text-left font-normal text-black/40 tracking-widest text-[9px]",
                    i === 0 && "rounded-tl-lg",
                    i === headers.length - 1 && "rounded-tr-lg"
                  )}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {dataRows.map((row, i) => (
                <tr key={i} className="group hover:bg-black/[0.01] transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className={cn(
                      "py-4 px-4 text-black/70 border-b border-black/[0.03] align-top leading-relaxed",
                      j === 0 && "font-normal text-black tracking-tight",
                      i === dataRows.length - 1 && "border-b-0"
                    )}>
                      {parseContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[32px] lg:text-[48px] font-normal leading-[1.2] tracking-tight text-black uppercase">
            Execution <span className="text-[#5F6368]">Scope</span>
          </h2>
          <p className="text-[16px] lg:text-[18px] text-[#5F6368] max-w-xl mx-auto font-normal">
            Investment scales with page count, niche complexity, and the strategic value of your service price.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div className="p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-end mb-6">
                <label className="text-[10px] font-normal uppercase tracking-[0.2em] text-black/40">
                  1. Target Investment
                </label>
                <div className="text-right">
                  <span className="text-4xl font-normal text-black tracking-tighter uppercase">${amount}</span>
                  <span className="block text-[10px] font-normal text-black/40 mt-1">Initial projection</span>
                </div>
              </div>
              
              <Slider
                defaultValue={[1200]}
                min={500}
                max={10000}
                step={100}
                onValueChange={(vals) => setAmount(vals[0])}
                className="w-full mb-8"
              />
              
              <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-black/[0.03]">
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  amount >= 3000 ? "bg-black" : "bg-black/40"
                )} />
                <span className="text-[11px] font-normal uppercase tracking-wider text-black/60">
                  {amount >= 3000 ? "High-Ticket Conversion Strategy" : "Performance-Focused Build"}
                </span>
              </div>
            </div>
            
            <div className="p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <label className="block text-[10px] font-normal uppercase tracking-[0.2em] text-black/40 mb-4">
                2. Context Details
              </label>
              <textarea
                value={businessInfo}
                onChange={(e) => setBusinessInfo(e.target.value)}
                placeholder="Niche, Service Price, Page Count... e.g. 'HVAC, $10k avg contract, 6 pages needed.'"
                className="w-full h-40 p-5 rounded-2xl border border-black/[0.08] bg-gray-50/50 text-[14px] text-black/80 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all resize-none placeholder:text-black/20"
              />
              <div className="mt-4 flex items-start gap-2 text-[11px] text-black/40 leading-relaxed">
                <Star className="w-3.5 h-3.5 mt-0.5 shrink-0 text-black" />
                <p>We factor in your service price to engineer pages that qualify high-ticket leads effectively.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="relative group">
              <div className="absolute -inset-1 bg-black/5 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative rounded-[1.8rem] bg-white border border-black/[0.08] shadow-xl overflow-hidden flex flex-col min-h-[520px]">
                <div className="p-8 pb-4 border-b border-black/[0.03] flex items-center justify-between bg-gray-50/30">
                  <h3 className="text-[10px] font-normal uppercase tracking-[0.2em] text-black/40">
                    Execution Forecast
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      amount >= 3000 ? "bg-black" : "bg-black/40"
                    )}></span>
                    <span className="text-[10px] font-normal uppercase tracking-wider text-black/60">Live Forecast</span>
                  </div>
                </div>
                
                <div className="p-8 flex-grow">
                  {isLoading && !outcome ? (
                    <div className="space-y-6">
                      <div className="h-4 w-1/3 bg-gray-100 rounded-full animate-pulse"></div>
                      <div className="space-y-3">
                        <div className="h-12 w-full bg-gray-50 rounded-xl animate-pulse"></div>
                        <div className="h-12 w-full bg-gray-50 rounded-xl animate-pulse"></div>
                        <div className="h-12 w-full bg-gray-50 rounded-xl animate-pulse"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                      {renderOutcome(outcome)}
                    </div>
                  )}
                </div>
                
                <div className="p-8 pt-0 mt-auto">
                  <div className="p-6 rounded-2xl bg-black text-white shadow-lg overflow-hidden relative group/btn">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-transform duration-500">
                      <Rocket className="w-16 h-16 rotate-12" />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-white/40 block mb-1">Guaranteed Delivery</span>
                        <span className="text-lg font-normal uppercase tracking-tight">Rapid Execution</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-normal text-white/60 max-w-[140px] leading-tight">
                          Confirm with Abhinav to start your build today.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[11px] text-black/30 font-normal uppercase tracking-widest">
            Strategic depth scales with niche complexity and service value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSlider;
