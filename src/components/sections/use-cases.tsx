import React from 'react';
import { Briefcase, Drill, Hammer } from 'lucide-react';

const UseCases: React.FC = () => {
  const useCaseData = [
    {
      icon: <Drill className="w-6 h-6 text-black" strokeWidth={1.5} />,
      title: "HVAC & Mechanical",
      description: "When a customer's AC breaks, they don't want a pretty website—they want a fast one. We build conversion engines that dominate local search and turn frantic clicks into booked service calls.",
      tagline: "Built for speed, made for jobs."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-black" strokeWidth={1.5} />,
      title: "High-Ticket Services",
      description: "From solar to plumbing to roofing. If your average contract is in the thousands, your landing page needs to build immediate authority and qualify leads before they ever reach your inbox.",
      tagline: "Qualified leads over vanity metrics."
    },
    {
      icon: <Hammer className="w-6 h-6 text-black" strokeWidth={1.5} />,
      title: "Local Business Owners",
      description: "You're too busy running your crew to worry about web design. We take the documentation you have and turn it into a high-performance digital asset. Zero meetings required.",
      tagline: "Execution over explanation."
    }
  ];

  return (
    <section className="bg-white py-[120px] border-y border-black/5">
      <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="mb-16 text-center">
            <h2 className="text-[2.5rem] leading-[1.2] font-normal tracking-[-0.04em] uppercase text-black">
              Who <span className="text-[#5F6368]">Execute</span> Is For
            </h2>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {useCaseData.map((useCase, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex-grow">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-[0_0_0_1px_#dadce0]">
                  {useCase.icon}
                </div>
                
                <h3 className="text-2xl font-normal text-[#000000] mb-4 uppercase tracking-tight">
                  {useCase.title}
                </h3>
                
                <p className="text-base leading-[1.6] text-[#5f6368] mb-8 font-normal">
                  {useCase.description}
                </p>
              </div>

                <div className="mt-auto">
                  <span className="text-sm font-normal text-black/40 uppercase tracking-widest block">
                    {useCase.tagline}
                  </span>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
