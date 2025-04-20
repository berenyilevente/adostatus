"use client";

import * as NextImage from "next/image";

export const Image = ({
  src,
  alt,
  className,
  ...props
}: NextImage.ImageProps) => {
  if (!src) {
    return null;
  }

  return (
    <NextImage.default src={src} alt={alt} className={className} {...props} />
  );
};
