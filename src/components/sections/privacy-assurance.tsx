import React from 'react';
import Image from 'next/image';

const PrivacyAssurance = () => {
  return (
    <section className="bg-[#f8f9fa] py-[120px] px-6 text-center overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Text */}
        <div className="mb-12">
          <h2 className="text-[#202124] text-[44px] leading-[1.25] font-normal font-display max-w-[800px] mx-auto tracking-tight">
            We value your privacy and never use your organization&apos;s data to train NotebookLM
          </h2>
          <p className="mt-6 text-[#5f6368] text-[18px] leading-[1.5] font-body max-w-[700px] mx-auto">
            As an organization or school, your data will stay private to you. As an individual, your data is not used for training unless you share feedback, see more details{' '}
            <a 
              href="#" 
              className="text-[#1a73e8] hover:underline decoration-1 underline-offset-2"
            >
              here
            </a>.
          </p>
        </div>

        {/* Hero Illustration */}
        <div className="relative mt-8 flex justify-center">
          <div className="relative w-full max-w-[600px] aspect-[4/3] flex items-center justify-center">
            {/* The provided asset contains the entire illustration (lock, orbits, and icons) */}
            <div className="relative w-full h-full transform scale-110">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/28e5217f-a9da-4827-8acd-9644da331a03-notebooklm-google/assets/images/privacy-8.png"
                  alt="Privacy and Security Illustration"
                  width={600}
                  height={450}
                  className="object-contain"
                  priority
                />
            </div>
            
            {/* Soft background glow element to match the "Google Modern Stationery" aesthetic */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #4285f4 0%, transparent 70%)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyAssurance;