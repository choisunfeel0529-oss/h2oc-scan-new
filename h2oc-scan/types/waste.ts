export type WasteCategory =
  | "PET" | "PP" | "HDPE" | "LDPE" | "폐지" | "알루미늄 캔" | "지원하지 않는 품목";

export interface AnalyzeResult {
  category: WasteCategory;
  icon: string;
}

export const CATEGORY_ICONS: Record<WasteCategory, string> = {
  PET: "\u{1F964}",
  PP: "\u{1F371}",
  HDPE: "\u{1F9F4}",
  LDPE: "\u{1F6CD}\u{FE0F}",
  폐지: "\u{1F4E6}",
  "알루미늄 캔": "\u{1F96B}",
  "지원하지 않는 품목": "\u{2753}",
};

export const CATEGORIES = Object.keys(CATEGORY_ICONS) as WasteCategory[];
