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
      throw new Error("ANALYSIS_FAILED");
    }

    const data = await res.json();

    const text = data.result;

    // Gemini 응답에서 JSON 추출
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("ANALYSIS_FAILED");
    }

    const result = JSON.parse(jsonMatch[0]);

const category = result.category as keyof typeof CATEGORY_ICONS;
    return {
      category,
      icon: CATEGORY_ICONS[category],
    };

  } catch (error) {
    throw new Error("ANALYSIS_FAILED");
  }
}