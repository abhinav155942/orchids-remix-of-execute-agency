import React from 'react';
import Image from 'next/image';

/**
 * FeatureInsights Section
 * 
 * Clones the "Instant insights" section of NotebookLM.
 * Features a text description on the left and a UI mockup image on the right.
 * 
 * Styles are derived from the provided Computed Styles and Design System.
 */
const FeatureInsights = () => {
  // Asset for the feature image
  const featureImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/28e5217f-a9da-4827-8acd-9644da331a03-notebooklm-google/assets/images/video_placeholder_2_replacement-1.png";

  return (
    <section className="bg-white py-[60px] md:py-[120px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-[48px]">
          
          {/* Content Column (Left on Desktop) */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <div className="mb-4 text-[#202124]">
              {/* Lightning/Bolt Icon */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path 
                  d="M7 21L11 13H4L17 3L13 11H20L7 21Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <h2 className="font-display text-[24px] leading-[1.33] font-normal text-[#202124] mb-4">
              Instant insights
            </h2>
            
            <p className="font-body text-[18px] leading-[1.5] text-[#5F6368] max-w-[480px]">
              With all of your sources in place, NotebookLM gets to work and becomes a personalized AI expert in the information that matters most to you.
            </p>
          </div>

          {/* Media Column (Right on Desktop) */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)]">
              <Image 
                src={featureImage}
                alt="NotebookLM Instant Insights UI Mockup"
                width={700}
                height={400}
                className="w-full h-auto block object-cover"
                priority
              />
              
              {/* Overlay elements replicate the specific UI state shown in screenshots */}
              {/* Note: The image itself contains most of the UI shown in the screen, 
                  but we ensure it's presented in the correct container as per the HTML structure. */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureInsights;