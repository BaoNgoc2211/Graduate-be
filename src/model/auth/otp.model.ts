import { IOtp } from "../../interface/auth/otp.interface";
import mongoose, { Schema } from "mongoose";

const OtpModel:Schema<IOtp> = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, {collection: 'Otp'})

const OTP = mongoose.model('Otp',OtpModel);
export default OTP;

