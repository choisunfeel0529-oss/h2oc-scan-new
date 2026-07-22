import type { AnalyzeResult } from "@/types/waste";

const IMAGE_KEY = "h2oc_captured_image";
const RESULT_KEY = "h2oc_analyze_result";

export const session = {
  setImage: (dataUrl: string) => sessionStorage.setItem(IMAGE_KEY, dataUrl),
  getImage: () => sessionStorage.getItem(IMAGE_KEY),
  setResult: (r: AnalyzeResult) => sessionStorage.setItem(RESULT_KEY, JSON.stringify(r)),
  getResult: (): AnalyzeResult | null => {
    const raw = sessionStorage.getItem(RESULT_KEY);
    return raw ? (JSON.parse(raw) as AnalyzeResult) : null;
  },
  clear: () => {
    sessionStorage.removeItem(IMAGE_KEY);
    sessionStorage.removeItem(RESULT_KEY);
  },
};
