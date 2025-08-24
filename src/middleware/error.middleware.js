"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    });
};
exports.default = asyncError;
