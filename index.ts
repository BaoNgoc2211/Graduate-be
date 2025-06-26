import cors from "cors";
import express from "express";
import appConfig from "./src/config/app.config";
import connectDB from "./database/connect-database";
import authRoutes from "./src/router/auth/auth.route";
import adminRoutes from "./src/router/auth/admin.route";
import medicineRoutes from "./src/router/medicine.route";
import disUsageRoutes from "./src/router/disease/disease-usage.route";
import disCategory from "./src/router/disease/disease-category.route";
import diseaseRoutes from "./src/router/disease/disease.route";
import symptomRoutes from "./src/router/disease/symptom.route";
import orderRoutes from "./src/router/order/order.route";
import uploadRoutes from "./src/router/upload.route";
import distributorRoutes from "./src/router/inventory/distributor.route";
import manufactureRoutes from "./src/router/inventory/manufacture.route";
import importBatchRoutes from "./src/router/inventory/import-batch.route";
import stockRoutes from "./src/router/inventory/stock.route";

import purchaseOrderRoutes from "./src/router/order/purchase-order.route";
import vnpayRoutes from "./src/router/vnpay.route";
import cartRoutes from "./src/router/order/cart.route";
import chatRoute from "./src/router/chat.route";
import notFoundRoute from "./src/middleware/not-found-routes.middleware";
import errorHandler from "./src/middleware/error-handler.middleware";
import session from "express-session";
import passport from "passport";
import "./src/config/passport";
import connectCloudinary from "./src/util/cloudinary";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

//disease
app.use("/api/disease", diseaseRoutes);
app.use("/api/disCategory", disCategory);
app.use("/api/disUsage", disUsageRoutes);
app.use("/api/symptom", symptomRoutes);

// app.use("/api/voucher", disCategory);
//medicine
app.use("/api/medicine", medicineRoutes);

app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchase-order", purchaseOrderRoutes);


app.use("/api/upload", uploadRoutes);

app.use("/api/vnpay", vnpayRoutes);


app.use("/api/chat", chatRoute);

//inventory
app.use("/api/distributor", distributorRoutes);
app.use("/api/manufacture", manufactureRoutes);
app.use("/api/import-batch", importBatchRoutes);
app.use("/api/stock", stockRoutes);


//đăng nhập googlen
app.use(
  session({
    secret: "your_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(notFoundRoute);
app.use(errorHandler);
app.listen(appConfig.PORT, () => {
  console.log(`App started at http://localhost:${appConfig.PORT}`);
  connectDB();
  connectCloudinary();
});

export default app;
