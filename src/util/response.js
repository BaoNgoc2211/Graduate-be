"use strict";
// import { Response } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRes = exports.paginate = exports.error = exports.success = void 0;
const success = (res, statusCode, message, data) => {
    const response = {
        status: 'success',
        message,
        data
    };
    return res.status(statusCode).json(response);
};
exports.success = success;
const error = (res, statusCode, message, data) => {
    const response = {
        status: 'error',
        message,
        data
    };
    return res.status(statusCode).json(response);
};
exports.error = error;
const paginate = (res, { message, data, page, limit, total }) => {
    return res.status(200).json({
        success: true,
        message,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    });
};
exports.paginate = paginate;
// Tránh dùng Object viết hoa
const returnRes = (res, status, message, data) => {
    return res.status(status).json({
        message,
        data
    });
};
exports.returnRes = returnRes;
