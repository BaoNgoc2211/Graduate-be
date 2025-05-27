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
export const riskGroup = {
  INFANT: "Nhũ nhi",
  TODDLER: "Trẻ nhỏ",
  PRESCHOOL_CHILD: "Trẻ mẫu giáo",
  CHILD: "Trẻ em",
  ADOLESCENT: "Thiếu niên",
  ADULT: "Người trưởng thành",
  ELDERLY: "Người cao tuổi",
} as const;
export type StagesEnum = keyof typeof StageEnum;
export type SeverityLevelEnum = keyof typeof SeverityEnum;
export type RiskGroup = keyof typeof riskGroup;
