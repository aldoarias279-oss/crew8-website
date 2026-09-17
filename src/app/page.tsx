import { BrandStripe } from "@/components/brand-stripe";
import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Pillars } from "@/components/pillars";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <BrandStripe />
        <Pillars />
        <BrandStripe />
        <Mission />
        <Capabilities />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
