import { Icon } from "@/components";
import { features } from "../features.helper";
import { FeaturesHeader } from "./FeaturesHeader";

export const FeaturesGrid = () => {
  return (
    <div className="relative z-10" id="features">
      <div className="container py-12 2xl:py-24">
        <FeaturesHeader />
        <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4 2xl:mt-24 2xl:gap-16">
          {features.map((feature, index) => {
            return (
              <div className="text-center" key={index}>
                <div className="inline-block">
                  <Icon icon={feature.icon} fontSize={28} />
                </div>
                <p className="mt-3 text-lg font-medium">{feature.title}</p>
                <p className="mt-1 text-sm text-base-content/80">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
