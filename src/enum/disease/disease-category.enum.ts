export const NameEnum = {
  SPECIALTY_INTERNAL: "Chuyên khoa nội khoa",
  SPECIALTY_SURGERY: "Chuyên khoa ngoại khoa",
  SPECIALTY_OBS_PED_GERI: "Chuyên khoa sản - nhi - lão",
  SPECIALTY_OTHERS: "Chuyên khoa chuyên biệt khác",
  SPECIALTY_LAB: "Chuyên khoa ngành cận lâm sàn",
  SPECIALTY_PREVENTIVE: "Y học dự phòng và quản lý hệ thống y tế",
} as const;
export type DiseaseCategoryEnum = keyof typeof NameEnum;
