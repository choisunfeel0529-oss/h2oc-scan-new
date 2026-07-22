"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, CameraOff } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";
import { session } from "@/lib/session";
import Spinner from "@/components/Spinner";

export default function CameraPage() {
  const router = useRouter();
  const { videoRef, status, capture, retry } = useCamera();

  const handleCapture = () => {
    const image = capture();
    if (!image) return;
    session.setImage(image);
    router.push("/analyzing");
  };

  return (
    <main className="relative h-full bg-black">
      <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Spinner light />
        </div>
      )}

      {status === "denied" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black px-8 text-center">
          <CameraOff className="h-12 w-12 text-white/60" />
          <p className="text-lg font-medium text-white">카메라 권한이 필요합니다.</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={retry}
            className="rounded-2xl bg-green-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-green-600"
          >
            다시 시도
          </motion.button>
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        aria-label="뒤로가기"
        className="absolute left-4 top-4 rounded-full bg-black/40 p-3 text-white backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {status === "ready" && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleCapture}
            aria-label="촬영"
            className="h-20 w-20 rounded-full border-4 border-white bg-white/30 backdrop-blur-sm"
          >
            <span className="mx-auto block h-14 w-14 rounded-full bg-white" />
          </motion.button>
        </div>
      )}
    </main>
  );
}
