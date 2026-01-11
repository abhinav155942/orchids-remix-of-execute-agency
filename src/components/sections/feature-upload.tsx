import React from 'react';

const FeatureUpload = () => {
  return (
    <section className="bg-white py-12 lg:py-[120px]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-[48px]">
          {/* Left Content */}
          <div className="flex-1 w-full max-w-[480px]">
            <div className="mb-4">
              {/* Material Icon: person */}
              <div className="w-10 h-10 flex items-center justify-start text-[#202124]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
              </div>
            </div>
            
            <h2 
              className="text-[#202124] text-[24px] lg:text-[24px] font-normal leading-[1.33] mb-4 font-display"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Upload your sources
            </h2>
            
            <p 
              className="text-[#5F6368] text-[18px] leading-[1.5] font-normal"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Upload PDFs, websites, YouTube videos, audio files, Google Docs, Google Slides and more, and NotebookLM will summarize them and make interesting connections between topics, all powered by the latest version of Gemini’s multimodal understanding capabilities.
            </p>
          </div>

          {/* Right Media (Video) */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative rounded-[28px] overflow-hidden bg-[#000000] shadow-[0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)]">
              <video
                className="w-full h-auto block object-cover aspect-video"
                src="https://notebooklm.google/_/static/v4/videos/upload_your_sources.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureUpload;