import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import AIBooker from "@/components/sections/ai-booker";
import PricingSlider from "@/components/sections/pricing-slider";
import Features from "@/components/sections/features";
import ExecuteAgentShowcase from "@/components/sections/execute-agent-showcase";
import Showcase from "@/components/sections/showcase";
import UseCases from "@/components/sections/use-cases";
import TestimonialsMarquee from "@/components/sections/testimonials-marquee";
import FAQSection from "@/components/sections/faq";
import PrivacySection from "@/components/sections/privacy";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ExecuteAgentShowcase />
        <Showcase />
        <UseCases />
        <TestimonialsMarquee />
        <FAQSection />
        <PricingSlider />
        <PrivacySection />
      </main>
      <Footer />
    </div>
  );
}
