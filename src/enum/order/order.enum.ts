export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DELIVERING = "DELIVERING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}
export const PaymentMethod = {
  COD: "COD",
  VNPAY: "VN Pay",
  MOMO: "Momo",
} as const;
export const PaymentStatus = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  FAILED: "Thất bại",
} as const;
export type PaymentMethodEnum = keyof typeof PaymentMethod;
export type PaymentStatusEnum = keyof typeof PaymentStatus;
