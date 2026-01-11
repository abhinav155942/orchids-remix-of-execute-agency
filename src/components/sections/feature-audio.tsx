import React from 'react';
import { Volume2 } from 'lucide-react';

/**
 * FeatureAudio Section
 * 
 * This component clones the fourth feature section "Listen and learn on the go"
 * which showcases the Audio Overview video and its description.
 * 
 * Theme: Light
 * Design: Google Modern Stationery aesthetic
 */

export default function FeatureAudio() {
  return (
    <section className="bg-white py-[60px] md:py-[120px] px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-[48px]">
          
          {/* Content Column */}
          <div className="w-full md:w-[45%] flex flex-col items-start text-left order-2 md:order-1">
            <div className="mb-4">
              {/* Material Icon Wrapper */}
              <div className="flex items-center justify-center text-[#202124]">
                <Volume2 size={24} strokeWidth={1.5} className="md:w-6 md:h-6" />
              </div>
            </div>
            
            <h2 className="font-display text-[24px] leading-[1.33] text-[#202124] mb-4 font-normal">
              Listen and learn on the go
            </h2>
            
            <p className="font-body text-[18px] leading-[1.5] text-[#5f6368] max-w-[480px]">
              Our new Audio Overview feature can turn your sources into engaging “Deep Dive” discussions with one click.
            </p>
          </div>

          {/* Media Column - Video */}
          <div className="w-full md:w-[55%] order-1 md:order-2">
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] bg-[#F8F9FA]">
              <video 
                className="w-full h-auto block object-cover rounded-[28px]"
                src="https://notebooklm.google/_/static/v4/videos/listen_and_learn_on_the_go.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}