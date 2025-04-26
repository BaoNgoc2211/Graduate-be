export const StageEnum = {
  INCUBATION: "Ủ bệnh",
  PRODROMAL: "Khởi phát",
  ACUTE: "Toàn phát",
  RECOVERY: "Phục hồi",
} as const;
export const SeverityEnum = {
  MILD: "Nhẹ",
  MODERATE: "Trung bình",
  SEVERE: "Nặng",
  VERY_SEVERE: "Rất nặng",
  FATAL: "Tử vong",
} as const;
export type StagesEnum = keyof typeof StageEnum;
export type SeverityLevelEnum = keyof typeof SeverityEnum;
