import React from 'react';
import { User, Zap, Target } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  media: {
    type: 'video' | 'image';
    src: string;
    hasSpotlight?: boolean;
  };
}

const FeatureItem = ({ icon, title, description, media }: FeatureItemProps) => {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-[120px] max-w-[1280px] mx-auto px-6 py-10 lg:py-20`}>
      <div className="flex-1 w-full max-w-[480px]">
        <div className="mb-6">
          <div className="text-black mb-4">
            {icon}
          </div>
            <h3 className="text-[24px] lg:text-[28px] font-normal leading-[1.3] text-black mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="text-[16px] lg:text-[18px] leading-[1.6] text-[#5F6368]" dangerouslySetInnerHTML={{ __html: description }} />

        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="relative overflow-hidden rounded-[24px] bg-[#F8F9FA] aspect-[16/9]">
          {media.type === 'video' ? (
            <div className="relative w-full h-full">
                <video
                  src={media.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              {media.hasSpotlight && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 102, 255, 0.15) 100%)',
                    boxShadow: 'inset 0 0 100px rgba(0, 102, 255, 0.2)'
                  }}
                />
              )}
            </div>
          ) : (
            <img
              src={media.src}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function Features() {
    const featureData: FeatureItemProps[] = [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Service Blueprint & Strategic Features",
        description: "In this video we explain our services and features through a data-driven lens. We showcase how our architectural decisions and performance optimizations create a superior competitive advantage for your business.",
        media: {
          type: 'video',
          src: "https://player.vimeo.com/external/517081701.sd.mp4?s=d723707833053704d9c8f001b67812809e2003c9&profile_id=164&oauth2_token_id=57447761",
          hasSpotlight: true
        }
      },
        {
          icon: <User className="w-6 h-6" />,
          title: "No Sales Calls. Just <span class='text-gradient-gemini'>Execution</span>.",
            description: "We've removed the ritual of endless meetings. You confirm your project with <strong>Abhinav</strong>, provide your details or existing documentation, and we handle the rest. No fluff, no distractions.",
            media: {
              type: 'image',
              src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            }
          },
      {
        icon: <Target className="w-6 h-6" />,
        title: "World-Class Design Showcase",
        description: "Explore a collection of high-converting, visually stunning experiences crafted to set your brand apart. Every site is a conversion engine designed to outperform custom builds costing tens of thousands.",
        media: {
          type: 'video',
          src: "https://player.vimeo.com/external/494444907.sd.mp4?s=a44a726f1832049e88d01156641885b1a37a77e0&profile_id=164&oauth2_token_id=57447761",
          hasSpotlight: true
        }
      }
    ];

    return (
      <section id="features" className="relative bg-white py-[60px] lg:py-[120px] overflow-hidden">
        
          <div className="container relative z-10 mx-auto">
            <div className="text-center mb-[60px] lg:mb-[80px]">
              <h2 className="text-[32px] lg:text-[48px] font-normal leading-[1.05] tracking-[-0.04em]">
                <span className="text-gradient-gemini">How We Create Leverage</span>
              </h2>
            </div>
          
          <div className="space-y-4 lg:space-y-0">
            {featureData.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  media={feature.media}
                />
            ))}
          </div>
        </div>
    </section>
  );
}
