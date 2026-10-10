import costumesData from "./vietnameseCostumesDB.json";

export interface AoDaiEvolutionStage {
  period: string;
  name: string;
  description: string;
  features: string[];
}

export interface CostumeLayerStructure {
  outerwear?: string;
  innerwear?: string;
  bottom?: string;
  waistband?: string;
  fasteners?: string;
  headwear?: string;
  footwear?: string;
  accessories?: string[];
}

export interface CostumeItem {
  id: string;
  name: string;
  aliases: string[];
  historicalPeriod: string;
  suitableOccasions: string[];
  culturalScore: number;
  overview: string;
  layers: CostumeLayerStructure;
  stylingRules: {
    coreGene: string;
    adaptation: string;
    taboos: string;
  };
}

export interface AccessoryItem {
  id: string;
  name: string;
  desc: string;
}

export interface VietnameseCostumesDatabase {
  metadata: {
    title: string;
    version: string;
    description: string;
    source: string;
  };
  aoDaiEvolution: AoDaiEvolutionStage[];
  costumes: {
    nu: CostumeItem[];
    nam: CostumeItem[];
  };
  accessoriesCatalog: {
    coTruyenNu: AccessoryItem[];
    coTruyenNam: AccessoryItem[];
    hienDaiNu: AccessoryItem[];
    hienDaiNam: AccessoryItem[];
  };
  mascotCom: {
    name: string;
    persona: string;
    features: string[];
    expressions: string[];
  };
}

export const vietnameseCostumesDB = costumesData as VietnameseCostumesDatabase;
