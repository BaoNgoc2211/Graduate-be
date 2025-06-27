// export interface IShipping {
//   calculateShippingFee(weight: number, distance: number): number;
//   getShippingMethodName(): string;
//   getEstimatedDays(): number;
// // }
// export interface IShippingContext {
//   setStrategy(strategy: IShipping): void;
//   calculateShippingFee(weight: number, distance: number): number;
//   getShippingMethodName(): string;
//   getEstimatedDays(): number;
// }

import { ShippingType } from "../enum/shipping.enum";

export interface IShipping {
  type: ShippingType;
  price: number; // Giá giao hàng (VND hoặc đơn vị bạn chọn)
}