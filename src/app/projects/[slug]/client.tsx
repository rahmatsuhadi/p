"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ProjectDetailClient({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
