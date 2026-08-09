import { CATEGORY_ICONS, type AnalyzeResult } from "@/types/waste";

export async function analyzeImage(image: string): Promise<AnalyzeResult> {
  try {
    const res = await fetch("/api/vision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    if (!res.ok) {
      throw new Error("API_ERROR");
    }

    const data = await res.json();

    console.log("ROBOFLOW DATA:", data);


    const predictions =
      data.result?.outputs?.[0]?.predictions?.predictions;


    if (!predictions) {
      throw new Error("NO_PREDICTION");
    }


    // confidence 가장 높은 클래스 선택
    const bestPrediction = Object.entries(predictions)
      .sort(
        (a: any, b: any) =>
          b[1].confidence - a[1].confidence
      )[0][0];


    console.log("BEST PREDICTION:", bestPrediction);


    let category = bestPrediction;


    // 클래스명 정리
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
      console.log("UNSUPPORTED:", category);

      return {
        category: "지원하지 않는 품목",
        icon: CATEGORY_ICONS["지원하지 않는 품목"],
      };
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
