import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, businessInfo } = await req.json();

    const systemPrompt = `You are a high-level execution architect at Execute, an elite agency specializing in high-performance Next.js conversion engines.
Your objective is to generate a professional, agency-grade execution roadmap that demonstrates absolute clarity and high value.

Rules:
- Output ONLY a Markdown table with exactly 3 columns: **feature**, **execution detail**, and **priority**.
- The "execution detail" must be professional, concise, and focused on conversion and performance.
- Use ONLY the following tags in the third column:
  [ICON_ROCKET] - Speed/Launch
  [ICON_ZAP] - Automation/Power
  [ICON_SHIELD] - Trust/Reliability
  [ICON_CLOCK] - Rapid Timeline
  [ICON_CHECK] - Conversion/Done
  [ICON_MESSAGE] - Direct Access
  [ICON_GLOBE] - High Performance
  [ICON_LAYOUT] - UX/UI
- Tone: Extremely professional, authoritative, and direct. 
- Constraints: No meetings, no sales calls. Direct communication with Abhinav.
- Formatting: Use **bold** within cells for emphasis. Ensure the table is perfectly formatted.`;

const userPrompt = `Client Investment: $${amount}
Business Context: ${businessInfo || "No context provided - assume a standard service business needing conversion."}

Requirements:
1. Create a 4-5 row roadmap tailored to this budget.
2. For budgets >= $1500, highlight advanced conversion strategy, niche-specific engineering, and high-ticket qualification.
3. For budgets < $1500, focus on high-performance essentials and core conversion physics.
4. Ensure the output is strictly a markdown table.
5. If business context is provided (e.g., "HVAC company"), use industry-specific terms to show professional understanding.`;


    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      temperature: 0.3,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    let outcome = response.choices[0].message.content || "";
    
    return NextResponse.json({ outcome });
  } catch (error) {
    console.error("Outcome API Error:", error);
    return NextResponse.json(
      { 
        outcome: "| **feature** | **execution detail** | **priority** |\n| :--- | :--- | :--- |\n| Core Build | High-conversion Next.js landing page | [ICON_ROCKET] **High Performance** |\n| Strategic Content | Conversion-focused copy based on your niche | [ICON_CHECK] **Sales Focused** |\n| Rapid Delivery | Ready to launch in 6 days | [ICON_CLOCK] **Speed** |" 
      },
      { status: 200 }
    );
  }
}
