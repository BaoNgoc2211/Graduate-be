import express from "express";
import appConfig from "./config/app.config";
import connectDB from "./database/connect-database";

const app = express();

app.listen(appConfig.PORT, () => {
  console.log(`App started at http://localhost:${appConfig.PORT}`);
  connectDB();
});
