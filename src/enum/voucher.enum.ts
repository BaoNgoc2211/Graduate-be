export const disCountTypeEnum = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
} as const;

export const applyToEnum = {
  PRODUCT: "product",
  SHIPPING: "shipping",
  ORDER: "order",
} as const;

export type DisCountTypeEnum = keyof typeof disCountTypeEnum;
export type ApplyToEnum = keyof typeof applyToEnum;
