import { Icon, IconType } from "@/components";
import { config } from "@/config";
import { ReactElement } from "react";

const features: {
  name: string;
  description: string;
  icon: IconType;
}[] = [
  {
    name: "Pre-configured features:",
    description:
      "Stripe, user auth, backend, emails and more - all configured and ready to go in minutes.",
    icon: "wand2",
  },
  {
    name: "Copy-pasteable modules:",
    description:
      "Use prebuilt fullstack modules for a calendar page, users page, task management, and much more.",
    icon: "copy",
  },
  {
    name: "Clear development guidelines:",
    description:
      "Developed with industry best practices to maximize speed and consistency.",
    icon: "codeSquare",
  },
];

export const FeaturesList = (): ReactElement => {
  return (
    <div className="overflow-hidden bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-lg font-semibold text-primary">
                Introducing {config.app.name}
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight">
                Your All-in-One Code Library
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                {config.app.name} is a deployment-ready, full-stack template
                built on Tailwind, shadcn/ui, postgres, React, and Next.js.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9 space-x-1">
                    <dt className="inline font-semibold ">
                      <Icon
                        icon={feature.icon}
                        className="absolute left-1 top-1 size-5 text-primary"
                      />
                      {feature.name}
                    </dt>
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
