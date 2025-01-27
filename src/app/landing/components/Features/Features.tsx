import { ReactElement } from "react";
import { FeaturesWithImage } from "./components/FeaturesWithImage";

// todo: rephrase and move to documentation
// Features: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Problem section, and above your Pricing section.
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Problem: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "Swiftblocks has user auth, Stripe, emails all set up for you"
// select from the Features/components the one that best fits your product
export const Features = (): ReactElement => {
  return <FeaturesWithImage />;
};
