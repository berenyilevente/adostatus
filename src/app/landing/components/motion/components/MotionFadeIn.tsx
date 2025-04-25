"use client";

import React from "react";
import { motion } from "framer-motion";

import { fadeIn } from "@/lib/motion/motion";

export const MotionFadeIn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className={className}>
      {children}
    </motion.div>
  );
};
