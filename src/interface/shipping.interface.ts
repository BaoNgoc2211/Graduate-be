export interface IShipping {
  calculateShippingFee(weight: number, distance: number): number;
  getShippingMethodName(): string;
  getEstimatedDays(): number;
}
export interface IShippingContext {
  setStrategy(strategy: IShipping): void;
  calculateShippingFee(weight: number, distance: number): number;
  getShippingMethodName(): string;
  getEstimatedDays(): number;
}
