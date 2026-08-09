"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-16 px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
  H<sub className="text-3xl">2</sub>OC{" "}
  <span className="text-[#389337]">Scan</span>
</h1>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/camera")}
        className="flex w-full max-w-xs items-center justify-center gap-3 rounded-3xl bg-[#389337] py-6 text-xl font-semibold text-white shadow-lg shadow-green-200 transition-colors hover:bg-[#2f7d2e]"
      >
        <Camera className="h-6 w-6" />
        촬영하기
      </motion.button>
    </main>
  );
}
