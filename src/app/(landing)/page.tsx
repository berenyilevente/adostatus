import type { Metadata } from "next";
import {
  Navigation,
  Hero,
  Problem,
  FAQ,
  Pricing,
  Features,
  ContactForm,
  Compare,
  Footer,
} from "./components";

export const metadata: Metadata = {
  title: "Landing - Landing page",
};
const LandingPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Problem />
      <Features />
      <Pricing />
      <FAQ />
      <Compare />
      <ContactForm />
      <Footer />
    </>
  );
};

export default LandingPage;
