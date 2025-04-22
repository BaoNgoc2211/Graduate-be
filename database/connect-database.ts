import mongoose from "mongoose";
import appConfig from "../src/config/app.config";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(appConfig.MONGO_URL!);
    console.log(`Connected mongoDB successful ${connect.connection.host}`);
  } catch (error) {
    console.log(`Connected mongoDB failed ${error}`);
    process.exit(1);
  }
};
export default connectDB;
