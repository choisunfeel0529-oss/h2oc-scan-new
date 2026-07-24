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

const predictionClass =
  data.outputs?.[0]?.predictions?.predicted_classes?.[0];

console.log("PREDICTION:", predictionClass);

if (!predictionClass) {
  throw new Error("NO_PREDICTION");
}

let category = String(predictionClass);

    if (category === "ALU") {
      category = "알루미늄 캔";
    }

    if (category === "GLASS") {
      category = "지원하지 않는 품목";
    }

    const finalCategory =
      category as keyof typeof CATEGORY_ICONS;

    if (!CATEGORY_ICONS[finalCategory]) {
      throw new Error("UNKNOWN_CATEGORY");
    }

    return {
      category: finalCategory,
      icon: CATEGORY_ICONS[finalCategory],
    };

  } catch (error) {
    console.error("VISION ERROR:", error);
    throw new Error("ANALYSIS_FAILED");
  }
}
