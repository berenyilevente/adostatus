import type { Metadata } from "next";
import {
  Topbar,
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
      <Topbar />
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
