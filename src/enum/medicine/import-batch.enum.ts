export const StatusEnum = {
  EXPIRE: "Hết hạn",
  INST_OCK: "Hết hạn",
  SOLD_OUT: "Hết hạn",
} as const;

export type StatusEnum = keyof typeof StatusEnum;
