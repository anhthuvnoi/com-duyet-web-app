import guideData from "./wearingGuideDB.json";

export interface WearingStep {
  stepNumber: number;
  title: string;
  action: string;
  culturalImportance: string;
  badge: string;
}

export interface WearingGuide {
  id: string;
  matchingKeys: string[];
  name: string;
  dynasty: string;
  gender: "nu" | "nam";
  summary: string;
  keyGoldenRule: string;
  taboo: string;
  steps: WearingStep[];
}

export interface GeneralCulturalRule {
  id: string;
  title: string;
  content: string;
  severity: "critical" | "high" | "normal";
}

export const wearingGuidesDatabase: WearingGuide[] = guideData.guides as WearingGuide[];
export const generalCulturalRules: GeneralCulturalRule[] = guideData.generalRules as GeneralCulturalRule[];

/**
 * Tìm kiếm hướng dẫn cách mặc đúng dựa theo ID hoặc tên trang phục hoặc svgKey
 */
export function findWearingGuide(
  query: string | undefined | null,
  gender: "nu" | "nam" = "nu"
): WearingGuide {
  if (!query) {
    // Default fallback based on gender
    return gender === "nu" ? wearingGuidesDatabase[0] : wearingGuidesDatabase[3];
  }

  const cleanQuery = query.toLowerCase().trim();

  // 1. Direct key matching with preferred gender first
  const sameGenderGuides = wearingGuidesDatabase.filter((g) => g.gender === gender);
  const otherGenderGuides = wearingGuidesDatabase.filter((g) => g.gender !== gender);

  const exactSameGender = sameGenderGuides.find((guide) => {
    return (
      guide.id.toLowerCase() === cleanQuery ||
      guide.matchingKeys.some((k) => {
        const lk = k.toLowerCase();
        return cleanQuery === lk || cleanQuery.includes(lk) || (lk.length > 3 && lk.includes(cleanQuery));
      })
    );
  });
  if (exactSameGender) return exactSameGender;

  // 2. Direct key matching on all guides
  const exactAny = otherGenderGuides.find((guide) => {
    return (
      guide.id.toLowerCase() === cleanQuery ||
      guide.matchingKeys.some((k) => {
        const lk = k.toLowerCase();
        return cleanQuery === lk || cleanQuery.includes(lk) || (lk.length > 3 && lk.includes(cleanQuery));
      })
    );
  });
  if (exactAny) return exactAny;

  // 3. Name fuzzy matching
  const nameMatch = wearingGuidesDatabase.find((guide) => {
    return (
      cleanQuery.includes(guide.name.toLowerCase()) ||
      guide.name.toLowerCase().includes(cleanQuery)
    );
  });
  if (nameMatch) return nameMatch;

  // 4. Fallback based on gender
  const fallback = wearingGuidesDatabase.find((g) => g.gender === gender);
  return fallback || wearingGuidesDatabase[0];
}
