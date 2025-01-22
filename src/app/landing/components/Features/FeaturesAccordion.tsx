"use client";

import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  Icon,
} from "@/components";
import { features } from "./features.helper";
import { FeaturesHeader } from "./FeaturesHeader";

export const FeaturesAccordion = () => {
  return (
    <section className="container mx-auto bg-base-100" id="features">
      <FeaturesHeader />
      <div className="grid sm:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <Accordion key={feature.title} className="h-min">
            <AccordionTitle className="flex items-center gap-2">
              <Icon icon={feature.icon} />
              {feature.title}
            </AccordionTitle>
            <AccordionContent>{feature.description}</AccordionContent>
          </Accordion>
        ))}
      </div>
    </section>
  );
};
