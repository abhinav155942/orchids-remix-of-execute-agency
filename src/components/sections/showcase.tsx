import React from 'react';

const Showcase = () => {
  return (
    <section id="showcase" className="bg-black py-[120px]">
      <div className="container mx-auto px-6 max-w-[1280px]">
            <div className="mb-16 text-center">
                <h2 className="text-[32px] lg:text-[48px] font-normal leading-[1.2] tracking-tight mb-6 text-white uppercase">
                  High Performance <span className="text-gradient-gemini">Execution</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-normal">
                  We don't just build websites; we build conversion engines for HVAC companies and high-ticket service providers. Every pixel is engineered to turn clicks into booked jobs.
                </p>
            </div>

          <div className="relative w-full aspect-video min-h-[500px] lg:min-h-0 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://ai-powered-hvac-conversion-engine.vercel.app/"
              className="w-full h-full"
              title="HVAC Conversion Engine Showcase"
              loading="lazy"
            />
          </div>


      </div>
    </section>
  );
};

export default Showcase;
