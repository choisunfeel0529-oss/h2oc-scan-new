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

    if (!data.result) {
      throw new Error("NO_GEMINI_RESPONSE");
    }

    let text = data.result;
console.log("GEMINI RAW RESPONSE:", text);
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(text);

  const category = result.category as keyof typeof CATEGORY_ICONS;

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