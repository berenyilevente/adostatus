import type { Metadata } from "next";
import {
  Navigation,
  Hero,
  Problem,
  FAQ,
  Pricing,
  Features,
  Compare,
  Footer,
  Motion,
  Leads,
} from "./components";

export const metadata: Metadata = {
  title: "Landing - Landing page",
};
const LandingPage = () => {
  return (
    <>
      <Navigation />
      <Motion id="hero">
        <Hero />
      </Motion>
      <Motion id="problem">
        <Problem />
      </Motion>
      <Motion id="features">
        <Features />
      </Motion>
      <Motion id="compare">
        <Compare />
      </Motion>
      <Motion id="pricing">
        <Pricing />
      </Motion>
      <Motion id="faq">
        <FAQ />
      </Motion>
      <Motion id="footer">
        <Footer />
      </Motion>
    </>
  );
};

export default LandingPage;
