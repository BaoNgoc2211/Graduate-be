"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_config_1 = __importDefault(require("./src/config/app.config"));
const connect_database_1 = __importDefault(require("./database/connect-database"));
const chat_route_1 = __importDefault(require("./src/router/chat.route"));
const auth_route_1 = __importDefault(require("./src/router/auth/auth.route"));
const admin_route_1 = __importDefault(require("./src/router/auth/admin.route"));
const medicine_route_1 = __importDefault(require("./src/router/medicine.route"));
const disease_usage_route_1 = __importDefault(require("./src/router/disease/disease-usage.route"));
const disease_category_route_1 = __importDefault(require("./src/router/disease/disease-category.route"));
const disease_route_1 = __importDefault(require("./src/router/disease/disease.route"));
const disease_prediction_route_1 = __importDefault(require("./src/router/disease/disease-prediction.route"));
const symptom_route_1 = __importDefault(require("./src/router/disease/symptom.route"));
const order_route_1 = __importDefault(require("./src/router/order/order.route"));
const upload_route_1 = __importDefault(require("./src/router/upload.route"));
const distributor_route_1 = __importDefault(require("./src/router/inventory/distributor.route"));
const manufacture_route_1 = __importDefault(require("./src/router/inventory/manufacture.route"));
const import_batch_route_1 = __importDefault(require("./src/router/inventory/import-batch.route"));
const stock_route_1 = __importDefault(require("./src/router/inventory/stock.route"));
const shipping_route_1 = __importDefault(require("./src/router/shipping.route"));
const purchase_order_route_1 = __importDefault(require("./src/router/order/purchase-order.route"));
const voucher_route_1 = __importDefault(require("./src/router/voucher.route"));
const cart_route_1 = __importDefault(require("./src/router/order/cart.route"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./src/config/passport");
const cloudinary_1 = __importDefault(require("./src/util/cloudinary"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const chat_socket_1 = __importDefault(require("./src/util/chat.socket"));
require("./src/util/cron.ulti");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true,
    },
});
// Middlewares
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.use("/api/disease", disease_route_1.default);
app.use("/api/disease-prediction", disease_prediction_route_1.default);
app.use("/api/disCategory", disease_category_route_1.default);
app.use("/api/disUsage", disease_usage_route_1.default);
app.use("/api/symptom", symptom_route_1.default);
app.use("/api/voucher", voucher_route_1.default);
app.use("/api/shipping", shipping_route_1.default);
app.use("/api/medicine", medicine_route_1.default);
app.use("/api/order", order_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/purchase-order", purchase_order_route_1.default);
app.use("/api/upload", upload_route_1.default);
app.use("/api/distributor", distributor_route_1.default);
app.use("/api/manufacture", manufacture_route_1.default);
app.use("/api/import-batch", import_batch_route_1.default);
app.use("/api/stock", stock_route_1.default);
app.use("/api/chat", chat_route_1.default);
(0, chat_socket_1.default)(io);
// Google Login Sessions
app.use((0, express_session_1.default)({ secret: "your_secret", resave: false, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Start Server
server.listen(app_config_1.default.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${app_config_1.default.PORT}`);
    (0, connect_database_1.default)();
    (0, cloudinary_1.default)();
});
exports.default = app;
