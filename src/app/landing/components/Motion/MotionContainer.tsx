"use client";

import React from "react";
import { motion } from "framer-motion";

import { staggerContainer } from "@/lib/motion/motion";

export const MotionContainer = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  return (
    <motion.div
      variants={staggerContainer(0.2, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id={id}
      className={className}
    >
      {children}
    </motion.div>
  );
};
