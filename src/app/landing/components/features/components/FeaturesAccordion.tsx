"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Icon,
} from "@/components";
import { features } from "../features.helper";
import { FeaturesHeader } from "./FeaturesHeader";

export const FeaturesAccordion = () => {
  return (
    <section className="container mx-auto bg-base-100" id="features">
      <FeaturesHeader />
      <div className="grid sm:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <Accordion
            key={feature.title}
            type="single"
            collapsible
            className="h-min"
          >
            <AccordionItem value={feature.title}>
              <AccordionTrigger className="text-xl font-medium hover:no-underline">
                <div className="flex items-center gap-6">
                  <Icon icon={feature.icon} />
                  {feature.title}
                </div>
              </AccordionTrigger>
              <AccordionContent>{feature.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};
