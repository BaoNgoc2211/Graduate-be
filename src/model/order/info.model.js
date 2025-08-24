"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.InfoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9]{9,15}$/ },
    address: { type: String, required: true },
}, { _id: false });
