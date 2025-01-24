"use client";

import React, { ReactNode } from "react";

import { cn } from "@/utils";

interface IDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  position?: "left" | "right";
  className?: string;
  content?: ReactNode;
  children?: ReactNode;
}

export const Drawer: React.FC<IDrawerProps> = ({
  isOpen,
  onClose,
  position = "drawer-end",
  className,
  content,
  children,
}) => {
  const classNames = cn(position === "left" ? "drawer-start" : "drawer-end");

  return (
    <div className={cn(className, classNames)}>
      <input
        aria-label="drawer-toggle"
        type="checkbox"
        className={cn("drawer-toggle")}
        checked={isOpen}
        readOnly
      />
      <div className={cn("drawer-content")}>{children}</div>
      <div className={cn("drawer-side")}>
        <label className={cn("drawer-overlay")} onClick={onClose}></label>
        {content}
      </div>
    </div>
  );
};
