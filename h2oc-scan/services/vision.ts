import { CATEGORIES, CATEGORY_ICONS, type AnalyzeResult } from "@/types/waste";

/**
 * 이미지 분석 — UI는 이 함수만 호출합니다.
 * Vertex AI 연결 시 이 파일 내부만 교체하면 됩니다.
 * 실패 시 Error를 throw하여 UI에서 에러 화면을 표시합니다.
 */
export async function analyzeImage(image: string): Promise<AnalyzeResult> {
  // ══════ Mock 구현 (개발용) ══════
  await new Promise((r) => setTimeout(r, 2500));

  // 에러 처리 UI 테스트용: 10% 확률 실패 시뮬레이션 (배포 시 제거)
  if (Math.random() < 0.1) throw new Error("ANALYSIS_FAILED");

  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  return { category, icon: CATEGORY_ICONS[category] };

  // ══════ Vertex AI 연결 시 (교체 예시) ══════
  // const res = await fetch("/api/vision", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ image }),
  // });
  // if (!res.ok) throw new Error("ANALYSIS_FAILED");
  // const { category } = (await res.json()) as { category: WasteCategory };
  // return { category, icon: CATEGORY_ICONS[category] };
}
