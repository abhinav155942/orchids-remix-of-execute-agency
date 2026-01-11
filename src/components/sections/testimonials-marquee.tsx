"use client";

import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "“The load speed is insane. Our bounce rate dropped 40% in a week.”",
    author: "Alex D.",
    logo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“Finally, a landing page that actually qualifies leads before they call.”",
    author: "Sarah W.",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“No meetings, no fluff. Abhinav just delivered exactly what we needed.”",
    author: "Marcus J.",
    logo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“It converts better than our $10k custom agency build did.”",
    author: "Elena G.",
    logo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“Performance is the best moat. This site is a literal engine.”",
    author: "David L.",
    logo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“I sent the docs, and 6 days later, we were live and converting.”",
    author: "Chris P.",
    logo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“The user experience is flawless. It’s elegant but it actually sells.”",
    author: "Julia K.",
    logo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“Dynamic pricing that actually makes sense for the value delivered.”",
    author: "Robert B.",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“Business growth is about execution speed. Execute gets that.”",
    author: "Samantha T.",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    quote: "“Perfectly engineered for high-ticket service providers.”",
    author: "Kevin H.",
    logo: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=256&h=256&auto=format&fit=crop",
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div
    className="group relative flex h-[240px] w-[300px] md:w-[380px] flex-shrink-0 flex-col justify-between rounded-[24px] bg-black/90 p-6 md:p-8 transition-transform hover:scale-[1.02] focus:outline-none border border-white/10 backdrop-blur-sm"
  >
    <blockquote className="m-0 p-0">
      <p className="font-display text-[16px] md:text-[18px] font-normal leading-[1.4] text-white line-clamp-4 uppercase  tracking-tight">
        {testimonial.quote}
      </p>
    </blockquote>
    <div className="mt-4 flex items-center gap-3">
      <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border border-white/20 bg-gray-800 shadow-xl">
        <Image
          src={testimonial.logo}
          alt={testimonial.author}
          fill
          className="object-cover"
        />
      </div>
      <span className="font-display text-[12px] md:text-[14px] font-normal text-white uppercase tracking-widest opacity-80">
        {testimonial.author}
      </span>
    </div>
  </div>
);

export default function TestimonialsMarquee() {
  return (
    <section className="relative py-[120px] overflow-hidden bg-white">
      {/* Blue metallic contrast light effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
        <div className="container relative z-10 mb-16 text-center">
            <h2 className="font-display text-[40px] font-normal leading-[1.3] tracking-tighter uppercase  pr-2">
              What <span className="bg-gradient-to-r from-blue-700 via-blue-400 to-blue-800 bg-clip-text text-transparent">founders</span> are saying
            </h2>
            <p className="mt-4 text-black/60 font-normal ">
              <span className="bg-blue-600/15 px-2 py-1 rounded-sm">High performance. Low friction.</span>
            </p>
        </div>

      <div className="relative z-10 flex w-full flex-col gap-6">
        {/* Row 1: Left to Right */}
        <div className="flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex min-w-full shrink-0 items-center justify-around gap-6 animate-marquee">
            {testimonials.slice(0, 5).map((t, i) => (
              <TestimonialCard key={`row1-${i}`} testimonial={t} />
            ))}
            {/* Duplicate for seamless loop */}
            {testimonials.slice(0, 5).map((t, i) => (
              <TestimonialCard key={`row1-dup-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Reverse) */}
        <div className="flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex min-w-full shrink-0 items-center justify-around gap-6 animate-marquee direction-reverse">
            {testimonials.slice(5).map((t, i) => (
              <TestimonialCard key={`row2-${i}`} testimonial={t} />
            ))}
            {/* Duplicate for seamless loop */}
            {testimonials.slice(5).map((t, i) => (
              <TestimonialCard key={`row2-dup-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .direction-reverse {
          animation-direction: reverse;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
