"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICD10Model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ICD10Schema = new mongoose_1.default.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    vietnameseName: { type: String },
    chapter: { type: String },
});
exports.ICD10Model = mongoose_1.default.model("ICD10", ICD10Schema);
