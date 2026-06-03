// src/components/build/GlassCard.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function GlassCard({
  children,
  delay = 0,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`
        rounded-xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-5
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}