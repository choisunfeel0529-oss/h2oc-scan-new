"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { session } from "@/lib/session";
import type { AnalyzeResult } from "@/types/waste";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  useEffect(() => {
    const r = session.getResult();
    if (!r) {
      router.replace("/");
      return;
    }
    setResult(r);
  }, [router]);

  if (!result) return null;

  const isUnsupported = result.category === "지원하지 않는 품목";

  return (
    <main className="flex h-full flex-col px-8 py-10">
      <h1 className="text-center text-lg font-semibold text-green-600">AI 분석 완료</h1>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="my-auto flex flex-col items-center gap-6 rounded-3xl bg-white p-10 shadow-lg shadow-green-100"
      >
        <span className="text-7xl">{result.icon}</span>
        <p className="text-2xl font-bold text-gray-900">
          {isUnsupported ? "지원하지 않는 품목입니다." : `${result.category}입니다.`}
        </p>
        {!isUnsupported && (
          <p className="text-sm text-gray-500">H2OC 계산기를 이용해 계산해 주세요.</p>
        )}
      </motion.section>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          session.clear();
          router.push("/camera");
        }}
        className="flex w-full items-center justify-center gap-2 rounded-3xl bg-green-500 py-5 text-lg font-semibold text-white shadow-lg shadow-green-200 transition-colors hover:bg-green-600"
      >
        <RotateCcw className="h-5 w-5" />
        다시 촬영
      </motion.button>
    </main>
  );
}
