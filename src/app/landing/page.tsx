import type { Metadata } from "next";
import {
  Topbar,
  Hero,
  Problem,
  FAQ,
  Pricing,
  FeaturesGrid,
  FeaturesCarousel,
  FeaturesAccordion,
  ContactForm,
  Compare,
  Footer,
} from "./components";
import { Autocomplete, TextInput } from "@/components";

export const metadata: Metadata = {
  title: "Landing - Landing page",
};
const LandingPage = () => {
  return (
    <>
      <Topbar />
      <Hero />
      <Problem />
      <FeaturesCarousel />
      <Pricing />
      <FAQ />
      <Compare />
      <ContactForm />
      <Footer />
    </>
  );
};

export default LandingPage;
