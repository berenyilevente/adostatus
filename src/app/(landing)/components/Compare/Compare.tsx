"use client";

import { Card, CardBody, CardTitle, Icon } from "@/components";

// todo rephrase and move to docs
// A useful component when your product is challenging the status quo.
// Highlight the current pain points (left) and how your product is solving them (right)
// Try to match the lines from left to right, so the user can easily compare the two columns
export const Compare = () => {
  const withoutProduct = [
    "Increased complexity and inconsistency in your codebase.",
    "Building components from scratch.",
    "Poorly validated forms and components",
    "Fragmented and unprofessional appearance.",
  ];

  const withProduct = [
    "Pre-built, customizable components that save you time.",
    `Easy to maintain codebase`,
    "Compatible with popular frameworks and libraries, React Hook Form, and Zod",
    "High-quality components",
    "Consistent look and feel across your application",
  ];

  return (
    <section className="bg-base-100">
      <div className="max-w-5xl mx-auto px-8 py-16 md:py-32 ">
        <h2 className="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-12 md:mb-20">
          Tired of copy and pasting blocks of code?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 md:gap-12">
          <Card className="w-full ">
            <CardBody>
              <CardTitle>Apps without SwiftBlocks</CardTitle>
              <ul className="list-disc list-inside space-y-1.5">
                {withoutProduct.map((item, index) => (
                  <li key={index} className="flex gap-2 items-center text-base">
                    <Icon
                      icon="xCircle"
                      className="w-4 h-4 shrink-0 opacity-75 text-red-500"
                      size="xs"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card className="w-full ">
            <CardBody className="">
              <CardTitle>Apps + SwiftBlocks</CardTitle>
              <ul className="list-disc list-inside space-y-1.5">
                {withProduct.map((item, index) => (
                  <li key={index} className="flex gap-2 items-center text-base">
                    <Icon
                      icon="check"
                      className="w-4 h-4 shrink-0 opacity-75 text-green-500"
                      size="xs"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};
