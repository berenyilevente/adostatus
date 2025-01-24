"use client";

import { ReactElement } from "react";

import { cn } from "@/utils";
import { Image } from "@/components";

interface AvatarProps {
  src: string;
  className?: string;
  alt: string;
}

export const Avatar = ({ src, className, alt }: AvatarProps): ReactElement => {
  const classNames = cn("avatar rounded-full w-10", className);

  return (
    <div className={classNames}>
      <Image src={src} alt={alt} width={100} height={100} />
    </div>
  );
};
