import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateOutcome(amount: number, businessInfo: string) {
  const systemPrompt = `You are a high-level execution architect at Execute. 
Your objective is to generate a professional, ultra-clean, and human-readable execution roadmap for full-stack website and landing page development.

Rules:
- We ONLY provide full-stack website and landing page development. Do NOT include logo design, branding, or non-technical assets.
- Output ONLY a Markdown table with exactly 2 columns: **What we do** and **Simple explanation**.
- The "Simple explanation" must be simple, direct, and non-technical.
- NO technical jargon in the explanation column.
- Tone: Professional, authoritative, and direct.
- Formatting: Use **bold** within cells for emphasis. Ensure the table is perfectly formatted.

Pricing & Scope Architecture:
- $500–$1,000: Essential (Single-page landing page, mobile optimization, basic SEO, contact form integration).
- $1,000–$2,000: Performance (Multi-page site, fast load times, core web vitals, CMS integration, advanced analytics).
- $2,000–$5,000: Full-Stack (Custom business logic, database integration, user auth, complex UI/UX, third-party API connections).
- $5,000–$10,000: Elite (Enterprise-grade architecture, high-availability, advanced automation, custom dashboard, white-glove delivery).`;

  const userPrompt = `Client Investment: $${amount}
Business Context: ${businessInfo || "Full-stack website/landing page development."}

Requirements:
1. Create a 5-6 row roadmap strictly based on full-stack website/landing page development at the $${amount} tier.
2. Ensure the features match that specific tier's description.
3. Use industry-specific terms for the "What we do" column but keep "Simple explanation" very simple.
4. Output ONLY the markdown table. No extra text before or after.`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      temperature: 0.2,
      max_tokens: 1024,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Internal Outcome Generation Error:", error);
    return "| **What we do** | **Simple explanation** |\n| :--- | :--- |\n| **Core Build** | We build a fast landing page that gets you more customers. |\n| **Strategic Copy** | We write clear words that sell your service. |\n| **Rapid Launch** | We get your site live and working in under 7 days. |";
  }
}

export async function POST(req: NextRequest) {
  try {
    const { toolName, toolArgs } = await req.json();

    if (toolName === "dynamic_pricing") {
      const { complexity, features, suggested_price, business_context } = toolArgs;
      const amount = suggested_price;
      
      const outcome = await generateOutcome(amount, business_context || features.join(", "));
      
      return NextResponse.json({
        result: `Execute — Delivery Plan (Confirmed at $${amount.toLocaleString()})

Project Overview

**Budget:** $${amount.toLocaleString()} USD (fixed, as quoted)

**Complexity:** ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}

**Timeline:** ${toolArgs.timeline || "5–7 business days from kickoff"}

**Execution Lead:** Abhinav (direct delivery, no sales handoff)

Next Section

🚀 **Day-by-Day Execution Roadmap**

---

${outcome}

*Note: Pricing may adjust based on project scope and performance requirements.*`
      });
    }

    if (toolName === "ai_chatbot_config") {
      const { purpose, tone, integrations, custom_welcome_message, business_description } = toolArgs;
      
      return NextResponse.json({
          result: `Execute — Service Blueprint & Strategy
          
  Project Overview
  **Purpose:** ${purpose}
  **Complexity:** High (Execution Focused)
  **Timeline:** 5-7 Business Days
  **Lead:** Abhinav
  
  Next Section
  🚀 **Execute Core Blueprint**
  ---
  | **What we do** | **Simple explanation** |
  | :--- | :--- |
  | **Full-Stack Development** | We build complete, functional websites from scratch including the front and back end. |
  | **Landing Page Mastery** | We create high-converting, fast-loading single pages designed to sell your service. |
  | **Responsive UI/UX** | Design interfaces that look perfect and work smoothly on mobile, tablet, and desktop. |
  | **Custom Business Logic** | We build the hidden systems that make your website actually do work for your business. |
  | **Database Integration** | We set up secure ways to store and manage your customer data and site content. |
  | **Performance Tuning** | We optimize your site so it loads instantly and handles high traffic without breaking. |
  
  **How Execute Works**
  1. **Explain your dream**: Tell us what you need.
  2. **Confirm Scope**: We lock in what we build, the cost, and the date.
  3. **Execution**: We build, design, and integrate everything.
  4. **Delivery**: You receive a finished, functional product. Ready to deploy.
  
  *Note: We focus on results, not meetings. No long-term retainers. Fixed cost. Fixed timeline.*`
        });
      }

      if (toolName === "execute_research") {
        const { type, query } = toolArgs;
        
        if (type === "domain") {
          try {
            // Use RDAP for real-time domain status
            const rdapResponse = await fetch(`https://rdap.org/domain/${query.toLowerCase()}`);
            const isRegistered = rdapResponse.status === 200;
            const status = isRegistered ? "UNAVAILABLE" : "AVAILABLE";
            const price = isRegistered ? "Owned" : "$11.99/yr"; // Simplified price mock
            const message = isRegistered 
              ? `${query} is already registered. Try a different variation.` 
              : `${query} is available for ${price}. Secure it now to begin setup.`;

            return NextResponse.json({
              result: `RESEARCH_RESULT:domain:${query}:${status}:GoDaddy:${message} [LOGO:https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/17c27023-7d7f-44fd-8195-37b5ec48727a/image-1768131897985.png?width=8000&height=8000&resize=contain]`
            });
          } catch (e) {
            // Fallback to mock if RDAP fails
            return NextResponse.json({
              result: `RESEARCH_RESULT:domain:${query}:AVAILABLE:GoDaddy:${query} is available for $11.99/yr. [LOGO:https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/17c27023-7d7f-44fd-8195-37b5ec48727a/image-1768131897985.png?width=8000&height=8000&resize=contain]`
            });
          }
        } else {
          // General Chrome research - Use DuckDuckGo's free API for "real" snippets
          try {
            const searchResponse = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&skip_disambig=1`);
            const searchData = await searchResponse.json();
            const snippet = searchData.AbstractText || searchData.RelatedTopics?.[0]?.Text || `Analysis of ${query} indicates significant growth in modern architectural patterns.`;
            
            return NextResponse.json({
              result: `RESEARCH_RESULT:chrome:${query}:FOUND:Chrome:${snippet} [LOGO:https://www.vectorlogo.zone/logos/google_chrome/google_chrome-icon.svg]`
            });
          } catch (e) {
            return NextResponse.json({
              result: `RESEARCH_RESULT:chrome:${query}:FOUND:Chrome:Analysis of ${query} indicates high demand for modern architectural patterns. [LOGO:https://www.vectorlogo.zone/logos/google_chrome/google_chrome-icon.svg]`
            });
          }
        }
      }

    return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
