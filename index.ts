import express from "express";
import appConfig from "./src/config/app.config";
import connectDB from "./database/connect-database";
import authRoutes from "./src/router/auth.route";
import adminRoutes from "./src/router/admin.route";
import medicineRoutes from "./src/router/medicine.route";
import notFoundRoute from "./src/middleware/not-found-routes.middleware";
import errorHandler from "./src/middleware/error-handler.middleware";
import session from 'express-session';
import passport from 'passport';
import './src/config/passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
// app.use("/api/disease", disease);
// app.use("/api/disUsage", disUsage);
// app.use("/api/disCategory", disCategory);
// app.use("/api/voucher", disCategory);
app.use("/api/medicine", medicineRoutes);

//đăng nhập googlen
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// app.use(notFoundRoute);
// app.use(errorHandler);
app.listen(appConfig.PORT, () => {
  console.log(`App started at http://localhost:${appConfig.PORT}`);
  connectDB();
});

export default app;
