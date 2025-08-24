"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const icd10_model_1 = require("../model/icd10.model");
const fs_1 = require("fs");
const icd10Data = JSON.parse((0, fs_1.readFileSync)("src/databases/icd10.json", "utf8"));
// Kết nối đến MongoDB
mongoose_1.default
    .connect("medigo.jpjxlcz.mongodb.net")
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to MongoDB");
    // Xoá dữ liệu cũ nếu có
    yield icd10_model_1.ICD10Model.deleteMany({});
    // Thêm dữ liệu mới
    yield icd10_model_1.ICD10Model.insertMany(icd10Data);
    console.log("✅ Đã thêm dữ liệu ICD-10 thành công");
    process.exit(0);
}))
    .catch((err) => {
    console.error("❌ Kết nối MongoDB thất bại", err);
    process.exit(1);
});
