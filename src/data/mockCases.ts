import type { Case, ClinicalData } from "@/type/case";

export const mockCases: Case[] = [
  {
    id: "case_123",
    species: "Feline",
    name: "Mittens",
    age: "10 years",
    owner: "Jane Doe",
    complaint: "Stranguria and hematuria - 3 day history.",
    status: "New",
    createdAt: "2025-01-01",
  },
  {
    id: "C-2023-001",
    species: "Canine",
    name: "Bella",
    age: "4 years",
    owner: "Sarah Jenkins",
    complaint: "Acute vomiting and lethargy for 24 hours, refusal to eat.",
    status: "In Progress",
    createdAt: "2023-10-24",
  },
  {
    id: "C-2023-002",
    species: "Feline",
    name: "Luna",
    age: "2 years",
    owner: "Michael Chang",
    complaint: "Routine vaccination and annual checkup.",
    status: "Completed",
    createdAt: "2023-10-23",
  },
  {
    id: "C-2023-003",
    species: "Canine",
    name: "Max",
    age: "7 years",
    owner: "David Miller",
    complaint: "Limping on hind left leg after park activity.",
    status: "New",
    createdAt: "2023-10-25",
  },
  {
    id: "C-2023-004",
    species: "Avian",
    name: "Tweety",
    age: "18 months",
    owner: "Emma Wilson",
    complaint: "Feather plucking and behavioral changes.",
    status: "New",
    createdAt: "2023-10-25",
  },
  {
    id: "C-2023-005",
    species: "Feline",
    name: "Oliver",
    age: "10 years",
    owner: "Robert Brown",
    complaint: "Dental cleaning follow-up, gum redness noted.",
    status: "Completed",
    createdAt: "2023-10-20",
  },
];

export const MOCKED_RECOMMENDATIONS: ClinicalData = {
  summary:
    "10-year-old female spayed cat with E. coli UTI confirmed on culture",

  recommendations: [
    { title: "Primary Antibiotic", value: "Amoxicillin-clavulanate" },
    { title: "Dosage", value: "12.5–20 mg/kg PO q12h" },
    { title: "Duration", value: "7 days" },
    { title: "Monitoring", value: "Recheck clinical signs in 3–4 days" },
  ],
  flags: ["No complicating factors identified", "Follow ISCAID guidelines"],
};
