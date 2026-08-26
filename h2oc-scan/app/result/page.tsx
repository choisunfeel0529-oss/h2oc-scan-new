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
    <main
      className="
        flex h-full flex-col px-8 py-10
        bg-[url('/bg-paper.png')]
        bg-cover
        bg-center
      "
    >
      <h1 className="text-center text-lg font-semibold text-green-600">
        AI 분석 완료
      </h1>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="my-auto flex flex-col items-center gap-6 rounded-3xl bg-white p-10 shadow-lg shadow-green-100"
      >
        <span className="text-7xl">{result.icon}</span>

        <p className="text-2xl font-bold text-gray-900">
          {isUnsupported
            ? "지원하지 않는 품목입니다."
            : `${result.category}입니다.`}
        </p>

        {!isUnsupported && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">
              H₂OC 계산기를 이용해 계산해 주세요.
            </p>

            <a
              href="https://62e740fa-b500-4129-bbf4-2dddaac2bcca.vip.gensparksite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#389337] px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#2f7d2e]"
            >
              H₂OC 계산하러 가기
            </a>
          </div>
        )}
      </motion.section>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          session.clear();
          router.push("/camera");
        }}
        className="mx-auto flex w-[85%] items-center justify-center gap-2 rounded-2xl bg-[#6FBE69] py-3.5 text-base font-semibold text-white shadow-md shadow-green-200 transition-colors hover:bg-[#5EAD58]"
      >
        <RotateCcw className="h-5 w-5" />
        다시 촬영
      </motion.button>
    </main>
  );
}
