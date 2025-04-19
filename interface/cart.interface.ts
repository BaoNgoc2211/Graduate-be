import mongoose from "mongoose";

export interface ICart {
  userId: mongoose.Types.ObjectId;
  item: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  };
}
