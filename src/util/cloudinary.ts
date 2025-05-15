import { v2 as cloudinary } from "cloudinary";
import appConfig from "../config/app.config";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: appConfig.cloud_name,
    api_key: appConfig.api_key,
    api_secret: appConfig.api_secret,
  });
};

export default connectCloudinary;
