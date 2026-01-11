"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Why no sales calls?",
    answer: "Meetings and sales calls slow down execution. We've replaced them with direct communication. You confirm your project with Abhinav, provide your details or documentation, and we start building immediately.",
  },
  {
    question: "How does the process work?",
    answer: "You confirm for website creation with Abhinav. We ask for some details, your previous website, or informational docs. Then we create and send. Simple, efficient, and meeting-free.",
  },
  {
    question: "How is pricing determined?",
    answer: "Charges depend on page count, depth of work, page length, and your specific niche. We also factor in the price of your service—higher-ticket services require more engineering to ensure the conversion rate justifies the investment.",
  },
  {
    question: "What is your main goal?",
    answer: "While we do create elegant websites, our main goal is to create conversion engines. We prioritize performance, user experience, and strategic layouts that turn your visitors into customers.",
  },
  {
    question: "Who is this service for?",
    answer: "We specialize in HVAC companies and local business owners who need a high-performance digital asset without the headache of traditional agency management.",
  },
  {
    question: "What if I need changes?",
    answer: "Since we work from your provided documentation and clear conversion goals, the first version is designed to be the final one. However, we ensure the system is built to be scalable for your future growth.",
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-[120px] px-6 lg:px-0">
      <div className="container max-w-[1280px] mx-auto">
            <div className="mb-12">
              <h2 className="text-[40px] leading-[1.2] font-normal mb-4 uppercase text-black">
                The <span className="text-[#5F6368]">Protocol</span>
              </h2>
              <p className="text-[16px] text-black/60 font-normal uppercase tracking-widest">
                No meetings. Just <span className="text-black">Execution</span>.
              </p>
            </div>

        <div className="border-t border-black/10">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-black/10"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-8 flex items-center justify-between text-left transition-colors hover:bg-gray-50 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-[20px] font-normal leading-[1.5] text-black pr-8 uppercase">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-black transform transition-transform duration-200 ease-out ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index ? "max-height-auto pb-8 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{
                  maxHeight: openIndex === index ? "500px" : "0px",
                }}
              >
                <div className="text-[18px] leading-[1.6] text-black/70 max-w-[900px] font-normal">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
