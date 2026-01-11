import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
      <section className="relative w-full overflow-hidden bg-white pt-[120px] pb-[80px]">
        <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center">
                  <h1 className="mb-8 max-w-none text-[56px] font-medium leading-[1.0] tracking-[-0.05em] text-black md:text-[112px]">
                    <span className="text-gradient-gemini">
                      Digital Leverage
                    </span>
                  </h1>
                    <p className="max-w-[900px] text-[20px] leading-[1.35] text-black md:text-[28px] font-medium tracking-tight mb-12">
                      We create unfair growth advantages using technology.
                    </p>

                    <Link href="/create">
                      <Button className="bg-[#c97e58] hover:bg-[#b06a4a] text-white px-8 py-7 text-xl font-bold tracking-wider rounded-full shadow-xl transition-all hover:scale-105 active:scale-95">
                        CHAT AND BUILD IN 5 MIN
                      </Button>
                    </Link>
              </div>
        </div>
        <div className="h-[40px] md:h-[60px]" />
      </section>
  );
};

export default Hero;
