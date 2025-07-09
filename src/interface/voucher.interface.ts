import { ApplyToEnum, DisCountTypeEnum } from "../enum/voucher.enum";

export interface IVoucher {
  code: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  discountType: DisCountTypeEnum;
  discountValue: number;
  minOrderValue: number;
  maxDiscountValue?: number;
  usageLimit: number;
  usedCount: number;
  applyTo: ApplyToEnum;
  applyToIds: string[];
}
export interface IVoucherValidator {
  validate(orderValue: number, productIds?: string[]): boolean;
  getErrorMessage(): string;
}

export interface IVoucherCalculator {
  calculateDiscount(orderValue: number, productIds?: string[]): number;
}
