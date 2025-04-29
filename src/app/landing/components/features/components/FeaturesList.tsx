import { Icon, IconType } from "@/components";
import { config } from "@/config";
import { ReactElement } from "react";

const features: {
  name: string;
  description: string;
  icon: IconType;
}[] = [
  {
    name: "Custom Form Builder:",
    description:
      "Create industry-specific booking forms with custom fields, branding, and validation rules for each business type.",
    icon: "edit",
  },
  {
    name: "Unified Calendar:",
    description:
      "View and manage appointments across all your businesses in one centralized dashboard, saving time and reducing confusion.",
    icon: "calendar",
  },
  {
    name: "Website Integration:",
    description:
      "Embed booking forms directly into your WordPress, Webflow, or custom website with simple copy-paste code.",
    icon: "globe",
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
                One Platform for All Your Businesses
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                {config.app.name} is a flexible appointment scheduling platform
                designed to support a wide range of businesses — from
                restaurants and salons to dentists and consultants.
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
