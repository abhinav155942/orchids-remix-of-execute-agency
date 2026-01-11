import React from 'react';
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-grow pt-[120px] pb-[80px]">
        <div className="container mx-auto px-6 max-w-[800px]">
          <h1 className="text-[48px] lg:text-[64px] font-normal leading-[1.1] tracking-tight text-black mb-12 uppercase">
            Terms & <span className="text-[#5F6368]">Conditions</span>
          </h1>
          
          <div className="space-y-12 text-[18px] leading-[1.6] text-black/70 font-normal">
            <section>
              <h2 className="text-[24px] font-normal text-black mb-4 uppercase tracking-tight">1. Protocol Overview</h2>
              <p>
                Our service is built on the principle of execution without friction. By engaging with Abhinav for website creation, you agree to a "no-meeting" workflow. Communication is strictly conducted via documented details and direct confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-normal text-black mb-4 uppercase tracking-tight">2. Execution & Delivery</h2>
              <p>
                Once a project is confirmed and all necessary documentation (previous website, business details, service pricing) is provided, our team begins execution. Delivery timelines are typically 6-10 days depending on the scope.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-normal text-black mb-4 uppercase tracking-tight">3. Pricing Variables</h2>
              <p>
                Project fees are determined by page count, niche complexity, and the strategic value of the service being marketed. We factor in your service price to engineer high-ticket conversion pathways that require significant technical depth.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-normal text-black mb-4 uppercase tracking-tight">4. Client Obligations</h2>
              <p>
                The quality of the final conversion engine depends on the accuracy of the information provided at the start of the project. Clients are responsible for providing all necessary assets and documentation before execution begins.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-normal text-black mb-4 uppercase tracking-tight">5. No-Meeting Policy</h2>
              <p>
                To maintain our speed and performance standards, we do not participate in sales calls, discovery sessions, or status meetings. All project alignment is achieved through the initial documentation phase.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-normal text-black mb-4 uppercase tracking-tight">6. Refunds & Revisions</h2>
              <p>
                Due to the rapid nature of our execution and the custom engineering involved in every build, all sales are final once execution has commenced. Revisions are handled on a case-by-case basis and must align with the original documentation provided.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
