import { Collection, Schema } from "mongoose";
import { IShipping } from "../interface/shipping.interface";
import { timeStamp } from "console";

const ShippingSchema = new Schema<IShipping>{
{Collection: "Shipping", timeStamp: true}
}
const OTP = mongoose.model('Otp',OtpModel);
export default OTP;
