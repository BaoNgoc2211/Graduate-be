"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const catchError = (res, error) => {
    if (error instanceof http_errors_1.HttpError) {
        res.status(error.status).json({
            message: error.message,
        });
        return;
    }
    console.error("Lỗi:", error);
    return res.status(500).json({
        message: `Server error ${error}`,
    });
};
exports.default = catchError;
