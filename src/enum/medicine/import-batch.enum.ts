export const StatusEnum = {
  EXPIRE: "Còn hạn sử dụng",
  INST_OCK: "Hết hạn",
  SOLD_OUT: "Hết hàng",
} as const;

export type StatusEnum = keyof typeof StatusEnum;
