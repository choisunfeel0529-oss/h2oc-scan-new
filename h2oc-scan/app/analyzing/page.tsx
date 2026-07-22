"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { analyzeImage } from "@/services/vision";
import { session } from "@/lib/session";
import Spinner from "@/components/Spinner";

export default function AnalyzingPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const img = session.getImage();
    if (!img) {
      router.replace("/");
      return;
    }
    setImage(img);

    if (started.current) return;
    started.current = true;

    analyzeImage(img)
      .then((result) => {
        session.setResult(result);
        router.replace("/result");
      })
      .catch(() => setFailed(true));
  }, [router]);

  return (
    <main className="relative h-full overflow-hidden bg-black">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl brightness-75"
        />
      )}

      <div className="relative flex h-full flex-col items-center justify-center gap-8 px-8">
        {!failed ? (
          <>
            <p className="text-2xl font-semibold text-white drop-shadow">AI 분석 중...</p>
            <Spinner light />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center gap-3 text-center"
          >
            <p className="text-xl font-semibold text-white">분석에 실패했습니다.</p>
            <p className="mb-4 text-white/80">다시 촬영해 주세요.</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.replace("/camera")}
              className="flex items-center gap-2 rounded-2xl bg-green-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-green-600"
            >
              <RotateCcw className="h-5 w-5" />
              다시 촬영
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
