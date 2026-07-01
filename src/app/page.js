import HeroSection      from "@/components/HeroSection";
import TechMarquee      from "@/components/TechMarquee";
import ServicesSection  from "@/components/ServicesSection";
import WorkSection      from "@/components/WorkSection";
import ProcessSection   from "@/components/ProcessSection";
import TeamSection      from "@/components/TeamSection";
import ContactSection   from "@/components/ContactSection";
import SectionDivider   from "@/components/SectionDivider";

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* marquee immediately after hero — no divider, just visual flow */}
      <TechMarquee />

      <SectionDivider from="#FAFAFE" to="#FFFFFF" />
      <ServicesSection />

      <SectionDivider from="#FFFFFF" to="#FAF8F3" />
      <WorkSection />

      <SectionDivider from="#FAF8F3" to="#FFFFFF" />
      <ProcessSection />

      <SectionDivider from="#FFFFFF" to="#FAF8F3" />
      <TeamSection />

      <SectionDivider from="#FAF8F3" to="#FFFFFF" />
      <ContactSection />
    </div>
  );
}
