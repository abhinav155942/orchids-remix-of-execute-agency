import React from 'react';
import Image from 'next/image';

const PrivacySection = () => {
  return (
    <section className="bg-black py-[120px] overflow-hidden border-y border-white/5">
      <div className="container px-6 mx-auto max-w-[1280px]">
        {/* Text Content */}
        <div className="text-center max-w-[840px] mx-auto mb-16">
          <h2 className="text-[40px] leading-[1.2] font-normal text-white mb-6 tracking-tight uppercase ">
            The Execute Difference
          </h2>
          <p className="text-[20px] leading-[1.6] text-white/60 font-normal uppercase tracking-widest ">
            In a world full of agencies that talk, Execute builds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div className="p-10 rounded-[32px] bg-white/5 border border-white/10">
            <h3 className="text-2xl font-normal mb-4 uppercase ">Our Philosophy</h3>
            <p className="text-lg text-white/70 leading-relaxed font-normal">
              If it doesn't directly move revenue, reduce cost, or save time — it doesn't belong in the system. We operate on the principle that execution should be faster than decision-making.
            </p>
          </div>
          <div className="p-10 rounded-[32px] bg-white/5 border border-white/10">
            <h3 className="text-2xl font-normal mb-4 uppercase ">Our Commitment</h3>
            <p className="text-lg text-white/70 leading-relaxed font-normal">
              We promise clear scope, fast execution, and honest limitations. If something is not a good fit, we say no. If a system won't create real impact, we don't sell it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;