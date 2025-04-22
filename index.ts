import express from "express";
import appConfig from "./src/config/app.config";
import connectDB from "./database/connect-database";
import authRoutes from "./src/router/auth.route";
import notFoundRoute from "./src/middleware/not-found-routes.middleware";
import errorHandler from "./src/middleware/error-handler.middleware";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(notFoundRoute);
app.use(errorHandler);

app.listen(appConfig.PORT, () => {
  console.log(`App started at http://localhost:${appConfig.PORT}`);
  connectDB();
});

export default app;
