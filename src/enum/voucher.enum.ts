export const disCountTypeEnum = {
  PERCENTAGE: "PERCENTAGE",
  FIXED: "FIXED",
} as const;

export const applyToEnum = {
  ALL: "all",
  CATEGORY: "category",
  PRODUCT: "product",
  SHIPPING: "shipping",
  ORDER: "order",
} as const;

export type DisCountTypeEnum = keyof typeof disCountTypeEnum;
export type ApplyToEnum = keyof typeof applyToEnum;
