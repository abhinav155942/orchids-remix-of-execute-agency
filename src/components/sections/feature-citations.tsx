import React from 'react';

const FeatureCitations = () => {
  return (
    <section className="bg-[#FFFFFF] py-[120px] px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-[48px]">
        {/* Left Content Block */}
        <div className="w-full lg:w-[466px] flex flex-col items-start text-left">
          {/* Icon using Lucide-style Asterisk for accuracy to the "asterisk" mat-icon */}
          <div className="mb-4">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-[#202124]"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
              <line x1="22" y1="12" x2="2" y2="12" />
              <line x1="19.07" y1="19.07" x2="4.93" y2="4.93" />
            </svg>
          </div>

          <h2 className="font-display text-[44px] leading-[1.25] font-normal text-[#202124] mb-4 tracking-[-0.02em]">
            See the source, not just the answer
          </h2>
          
          <p className="font-body text-[18px] leading-[1.5] text-[#5F6368] font-normal">
            Gain confidence in every response because NotebookLM provides clear citations for its work, showing you the exact quotes from your sources.
          </p>
        </div>

        {/* Right Media Block */}
        <div className="w-full lg:w-[714px]">
          <div className="relative rounded-[28px] overflow-hidden bg-[#F8F9FA] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto block object-cover"
              src="https://notebooklm.google/_/static/v4/videos/see_the_source_not_just_the_answer.mp4"
            >
              <source 
                src="https://notebooklm.google/_/static/v4/videos/see_the_source_not_just_the_answer.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCitations;