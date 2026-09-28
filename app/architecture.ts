export type ArchitectureNode = {
  id: "surplus" | "edible" | "organic" | "core" | "ngo" | "partner" | "impact";
  label: string[];
  className: string;
};

/** Single source of truth for every recovery-network diagram. */
export const architectureNodes: ArchitectureNode[] = [
  { id: "surplus", label: ["SURPLUS"], className: "surplus" },
  { id: "edible", label: ["EDIBLE", "FOOD"], className: "edible" },
  { id: "organic", label: ["ORGANIC", "WASTE"], className: "organic" },
  { id: "core", label: ["ANNAPURNA"], className: "core" },
  { id: "ngo", label: ["VERIFIED", "NGO"], className: "ngo" },
  { id: "partner", label: ["WASTE", "PARTNER"], className: "partner" },
  { id: "impact", label: ["MEASURABLE", "IMPACT"], className: "impactNode" },
];

export const architectureRoutes = {
  path: "M450 70V130M450 130H230V200M450 130H670V200M230 280V345H330M670 280V345H570M330 415V485H450M570 415V485H450",
  junctions: [[450, 112], [310, 345], [590, 345]] as const,
};
