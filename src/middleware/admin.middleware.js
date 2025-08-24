"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminRole = exports.adminProtect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminProtect = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json({ message: "No token, unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.admin = decoded.userId;
        next();
    }
    catch (_a) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
exports.adminProtect = adminProtect;
const requireAdminRole = (req, res, next) => {
    // if (!req.admin || req.admin.role !== "ADMIN") {
    //    res.status(403).json({ message: "Access denied: Admins only" });
    //    return;
    // }
    next();
};
exports.requireAdminRole = requireAdminRole;
