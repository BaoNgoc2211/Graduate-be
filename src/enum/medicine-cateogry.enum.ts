export const typeEnum = {
  PRESCRIPTION: {
    vi: "Thuốc kê đơn",
    en: "Prescription Medicine",
  },
  NON_PRESCRIPTION: {
    vi: "Thuốc không kê đơn",
    en: "Over-the-Counter Medicine",
  },
  VITAMIN: {
    vi: "Vitamin",
    en: "Vitamin",
  },
  SUPPLEMENT: {
    vi: "Thực phẩm chức năng",
    en: "Dietary Supplement",
  },
  PERSONAL_CARE: {
    vi: "Chăm sóc cá nhân",
    en: "Personal Care",
  },
  OTHER: {
    vi: "Thuốc khác",
    en: "Other Medicine",
  },
} as const;
export const TherapeuticGroupEnum = {
  ANTIBIOTIC: "Thuốc kháng sinh",
  ONCOLOGY: "Thuốc ung thư",
  UROLOGY: "Thuốc tiết niệu",
  MALE_HEALTH: "Thuốc cho nam giới",
  ENT_EYE: "Thuốc Mắt/Tai/Mũi",
  VITAMIN: "Vitamin & Khoáng chất",
  DERMATOLOGY: "Thuốc da liễu",
  FEMALE_HEALTH: "Thuốc dành cho nữ",
  COLD_COUGH: "Thuốc cảm lạnh, ho",
  CONTRACEPTIVE: "Thuốc ngừa thai",
  CARDIO: "Thuốc tim mạch, huyết áp",
  DIGESTIVE: "Thuốc tiêu hóa",
  DIABETES: "Thuốc tiểu đường",
  ANTI_ALLERGY: "Kháng dị ứng",
  TOPICAL_PAIN_RELIEF: "Dầu xoa bóp, dầu gió",
  ANTI_INFLAMMATORY: "Thuốc kháng viêm",
  OTHER: "Thuốc khác",
  NEUROLOGY: "Thuốc thần kinh",
  ANALGESIC: "Thuốc giảm đau, hạ sốt",
  RESPIRATORY: "Hệ hô hấp",
  MUSCULOSKELETAL: "Thuốc cơ xương khớp",
} as const;
export type typeEnum = keyof typeof typeEnum;
export type TherapeuticGroupEnum = keyof typeof TherapeuticGroupEnum;
