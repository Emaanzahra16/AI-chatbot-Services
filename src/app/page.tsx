import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Services } from "@/components/sections/Services";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Team } from "@/components/sections/Team";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Services />
      <CaseStudy />
      <Process />
      <Results />
      <Team />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}