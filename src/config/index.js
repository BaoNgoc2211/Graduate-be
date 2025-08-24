"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    jwt: {
        secret: process.env.JWT_SECRET || "your-secret-key",
        expiresIn: "7d"
    },
    email: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS || ""
    }
};
exports.default = config;
