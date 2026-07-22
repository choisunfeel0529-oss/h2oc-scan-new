"use client";

import { motion } from "framer-motion";

export default function Spinner({ light = false }: { light?: boolean }) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className={`block h-14 w-14 rounded-full border-4 ${
        light ? "border-white/30 border-t-green-400" : "border-green-100 border-t-green-500"
      }`}
    />
  );
}
