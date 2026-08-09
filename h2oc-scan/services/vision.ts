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
      data.result?.outputs?.[0]?.predictions?.predicted_classes?.[0];

    console.log("PREDICTION:", predictionClass);

    if (!predictionClass) {
      throw new Error("NO_PREDICTION");
    }

    let category = String(predictionClass);

    // Roboflow 클래스명 정리
    if (category.includes("PET")) {
      category = "PET";
    } 
    else if (category.includes("HDPE")) {
      category = "HDPE";
    } 
    else if (category.includes("LDPE")) {
      category = "LDPE";
    } 
    else if (category.includes("PP")) {
      category = "PP";
    } 
    else if (category.includes("PS")) {
      category = "PS";
    }
    else if (category === "ALU") {
      category = "알루미늄 캔";
    }
    else if (category === "GLASS") {
      category = "지원하지 않는 품목";
    }


    const finalCategory =
      category as keyof typeof CATEGORY_ICONS;


    if (!CATEGORY_ICONS[finalCategory]) {
      console.error("지원하지 않는 CATEGORY:", category);
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
