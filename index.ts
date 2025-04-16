import express from "express";
import appConfig from "./config/app.config";

const app = express();

app.listen(appConfig.PORT, () => {
  console.log(`App started at http://localhost:${appConfig.PORT}`)
});
