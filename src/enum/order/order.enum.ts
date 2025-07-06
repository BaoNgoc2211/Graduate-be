export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DELIVERING = "DELIVERING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}
export const PaymentMethod = {
  COD: "COD",
  VNPAY: "VNPAY",
  MOMO: "MOMO",
} as const;
export const PaymentStatus = {
  UNPAID: "UNPAID",
  PAID: "PAID",
} as const;
export type PaymentMethodEnum = keyof typeof PaymentMethod;
export type PaymentStatusEnum = keyof typeof PaymentStatus;
