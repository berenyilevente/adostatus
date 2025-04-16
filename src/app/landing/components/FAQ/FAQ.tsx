import {
  Icon,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";

import { faqs } from "./faq.helper";

export const FAQ = () => {
  return (
    <div className="container pt-24 px-4 sm:px-0">
      <div className="grid gap-12 lg:grid-cols-7 lg:gap-24">
        <div className="col-span-3">
          <div className="flex items-center gap-3">
            <div className="inline-block rounded border border-purple-500/5 bg-purple-500/5 p-2.5">
              <Icon
                icon="messagesSquare"
                fontSize={20}
                className="text-primary"
              />
            </div>
            <p className="mt-3 text-3xl font-semibold">
              Any Questions in Mind?
            </p>
          </div>
          {/* <p className="mt-3 text-base-content/70">
            If you have still question, don&apos;t worry. Just contact us with
            your queries.
          </p>
          <Link className="btn btn-sm mt-4" href={"#"}>
            Contact Us
          </Link> */}
        </div>
        <div className="col-span-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion
                key={`${faq.title}-${index}`}
                type="single"
                collapsible
              >
                <AccordionItem value={faq.title}>
                  <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{faq.content}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
