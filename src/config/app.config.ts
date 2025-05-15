import dotenv from "dotenv";
dotenv.config();

const appConfig = () => ({
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default appConfig();
