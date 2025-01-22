import { cn } from "@/utils";
import React from "react";

type LoadingVariant =
  | "loading-spinner"
  | "loading-dots"
  | "loading-ring"
  | "loading-ball"
  | "loading-bars"
  | "loading-infinity";

type LoadingSize = "loading-xs" | "loading-sm" | "loading-md" | "loading-lg";

interface ILoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
}

export const Loading: React.FC<ILoadingProps> = ({
  variant = "loading-dots",
  size = "loading-md",
}) => {
  return <span className={cn("mx-auto loading", variant, size)} />;
};

Loading.displayName = "Loading";
