import { useEffect, useState } from "react";
import { features } from "./features.helper";

export const useFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>(
    features[0].title
  );
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFeature = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    setSelectedFeature(features[(currentIndex + 1) % features.length].title);
    setIsAutoSwitching(false);
  };

  const prevFeature = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + features.length) % features.length
    );
    setSelectedFeature(
      features[(currentIndex - 1 + features.length) % features.length].title
    );
    setIsAutoSwitching(false);
  };

  const onSelectFeature = (feature: string) => {
    setCurrentIndex(features.findIndex((f) => f.title === feature));
    setSelectedFeature(feature);
    setIsAutoSwitching(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoSwitching) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
        setSelectedFeature(
          features[(currentIndex + 1) % features.length].title
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoSwitching]);

  return {
    features,
    selectedFeature,
    isAutoSwitching,
    nextFeature,
    prevFeature,
    onSelectFeature,
  };
};
