const mainDosageFormEnum = {
  ORAL: "Dạng uống",
  PARENTERAL: "Dạng tiêm",
  TOPICAL: "Dạng dùng ngoài da",
  INHALATION: "Dạng hô hấp",
  SUPPOSITORY: "Dạng đặt",
  EYE_NOSE_EAR: "Dạng mắt, mũi, tai",
  OTHER: "Dạng khác",
} as const;
const oralDosageFormEnum = {
  TABLET: "Viên nén",
  FILM_COATED_TABLET: "Viên bao phim",
  EFFERVESCENT_TABLET: "Viên nén sủi bọt",
  CHEWABLE_TABLET: "Viên nhai",
  HARD_CAPSULE: "Viên nang cứng",
  SOFT_CAPSULE: "Viên nang mềm",
  GRANULES: "Hạt cốm",
  POWDER: "Bột uống",
  SYRUP: "Siro",
  ORAL_SOLUTION: "Dung dịch uống",
  ORAL_SUSPENSION: "Hỗn dịch uống",
  ORAL_EMULSION: "Nhũ tương uống",
} as const;
const parenteralDosageFormEnum = {
  INJECTION: "Dung dịch tiêm",
  INJECTION_SUSPENSION: "Hỗn dịch tiêm",
  INJECTION_EMULSION: "Nhũ tương tiêm",
  POWDER_FOR_INJECTION: "Bột pha tiêm",
  INFUSION: "Truyền tĩnh mạch",
} as const;
const topicalDosageFormEnum = {
  CREAM: "Kem",
  OINTMENT: "Thuốc mỡ",
  GEL: "Gel",
  TOPICAL_SOLUTION: "Dung dịch dùng ngoài",
  PATCH: "Miếng dán",
  POWDER: "Bột rắc",
} as const;
const inhalationDosageFormEnum = {
  MDI : "Thuốc xịt định liều",
  DPI : "Bột hít",
  NEBULIZER_SOLUTION : "Dung dịch khí dung",
} as const;
const suppositoryDosageFormEnum = {
  RECTAL: "Thuốc đặt hậu môn",
  VAGINAL: "Thuốc đặt âm đạo",
  VAGINAL_TABLET: "Viên nén âm đạo",
} as const;
const eyeNoseEarDosageFormEnum = {
  EYE_DROPS: "Thuốc nhỏ mắt",
  EYE_OINTMENT: "Thuốc mỡ mắt",
  NASAL_DROPS: "Thuốc nhỏ mũi",
  NASAL_SPRAY: "Thuốc xịt mũi",
} as const;
const otherDosageFormEnum = {
  LOZENGE: "Viên ngậm",
  SUBLINGUAL: "Viên đặt dưới lưỡi",
  BUCCAL: "Viên đặt má",
  MOUTHWASH: "Dung dịch súc miệng",
  VAGINAL_SOLUTION: "Dung dịch âm đạo",
  DISPERSIBLE_TABLET: "Viên phân tán",
  WASH_SOLUTION: "Dung dịch rửa",
} as const;

export type mainDosageFormEnum = keyof typeof mainDosageFormEnum;
export type oralDosageFormEnum = keyof typeof oralDosageFormEnum;
export type parenteralDosageFormEnum = keyof typeof parenteralDosageFormEnum;
export type topicalDosageFormEnum = keyof typeof topicalDosageFormEnum;
export type inhalationDosageFormEnum = keyof typeof inhalationDosageFormEnum;
export type suppositoryDosageFormEnum = keyof typeof suppositoryDosageFormEnum;
export type eyeNoseEarDosageFormEnum = keyof typeof eyeNoseEarDosageFormEnum;
export type otherDosageFormEnum = keyof typeof otherDosageFormEnum;
