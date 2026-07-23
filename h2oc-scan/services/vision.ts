import { CATEGORY_ICONS, type AnalyzeResult } from "@/types/waste";

export async function analyzeImage(image: string): Promise<AnalyzeResult> {
  try {
    const res = await fetch("/api/vision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
      }),
    });

    if (!res.ok) {
      throw new Error("API_ERROR");
    }

    const data = await res.json();

    console.log("ROBOFLOW DATA:", data);

const prediction =
  data.result?.predictions?.[0] ??
  data.predictions?.[0];
    console.log("PREDICTION:", prediction);
    if (!prediction) {
      throw new Error("NO_PREDICTION");
    }

    let category = prediction.class;

    // Roboflow 클래스명 → 기존 앱 클래스명 변환
    if (category === "ALU") {
      category = "알루미늄 캔";
    }

    if (category === "GLASS") {
      category = "지원하지 않는 품목";
    }

    category = category as keyof typeof CATEGORY_ICONS;

    if (!CATEGORY_ICONS[category]) {
      throw new Error("UNKNOWN_CATEGORY");
    }

    return {
      category,
      icon: CATEGORY_ICONS[category],
    };

  } catch (error) {
    console.error("VISION ERROR:", error);
    throw new Error("ANALYSIS_FAILED");
  }
}
