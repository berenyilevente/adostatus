"use client";

import { Icon } from "@/components";
import { useFeatures } from "../use-features";
import { FeaturesHeader } from "./FeaturesHeader";

export const FeaturesCarousel = () => {
  const {
    features,
    selectedFeature,
    onSelectFeature,
    nextFeature,
    prevFeature,
  } = useFeatures();

  const selectedClassName = (title: string) =>
    selectedFeature === title ? "text-primary" : "text-base-content/30";

  return (
    <section
      className="py-12 container flex flex-col items-center max-w-4xl"
      id="features"
    >
      <FeaturesHeader />
      <div className="mt-7">
        <div className="flex justify-start items-center gap-4 md:gap-12 max-md:px-8 mx-auto mb-8">
          <div className="text-primary">
            <Icon
              icon="chevronLeft"
              className="text-secondary opacity-50 cursor-pointer"
              size="md"
              onClick={prevFeature}
            />
          </div>
          <div className="flex gap-4">
            {features.map(({ title, icon }) => (
              <span
                key={title}
                onClick={() => onSelectFeature(title)}
                className={`flex flex-col items-center gap-3 select-none cursor-pointer p-2 ${selectedClassName(title)}`}
              >
                <Icon size="md" icon={icon} />
                <span className="font-semibold text-sm text-nowrap">
                  {title}
                </span>
              </span>
            ))}
          </div>
          <div>
            <Icon
              icon="chevronRight"
              className="text-secondary opacity-50 cursor-pointer"
              size="md"
              onClick={nextFeature}
            />
          </div>
        </div>
        <div className="bg-base-200 select-none">
          <div className="mx-auto flex px-12 flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
            <div className="text-base-content/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl">
              {features.map((feature) => (
                <div key={feature.title}>
                  <h3 className="font-semibold text-base-content text-lg">
                    {feature.title === selectedFeature && feature.title}
                  </h3>
                  {feature.title === selectedFeature && feature.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
