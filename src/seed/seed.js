"use strict";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Manufacturer from "../model/medicine/manufacturer.model";
// import Distributor from "../model/medicine/distributor.model";
// import MedicineCategory from "../model/medicine/medicine-category.model";
// import MedicineUsageGroup from "../model/medicine/medicine-usage.model";
// import Medicine from "../model/medicine/medicine.model";
// import ImportBatch from "../model/medicine/import-usage.model";
// dotenv.config();
// async function seed() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/medicine");
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
//     const manufacturer = await Manufacturer.create({
//       nameCo: "Pfizer",
//       country: "USA",
//       branch: "New York",
//     });
//     const distributor = await Distributor.findOne({ nameCO: 'Global Pharma' });
//     if (!distributor) {
//       await Distributor.create({
//         nameCO: 'Global Pharma',
//         address: '123 Main St',
//         phone: '0123456789',
//       });
//     } else {
//       console.log('Distributor "Global Pharma" đã tồn tại, không cần thêm.');
//     }
//     // const distributor = await Distributor.create({
//     //   nameCO: "Global Pharma",
//     //   nameRep: "John Doe",
//     //   email: "john@global.com",
//     //   phone: "1234567890",
//     //   address: "123 Health St",
//     //   country: "USA",
//     // });
//     const category = await MedicineCategory.create({
//       name: "Thuốc kê đơn",
//       icon: "🧫",
//     });
//     const usage = await MedicineUsageGroup.create({
//       name: "Oral",
//       icon: "💊",
//     });
//     const medicine = await Medicine.create({
//       code: "MED123",
//       name: "Amoxicillin",
//       thumbnail: "https://example.com/thumb.jpg",
//       packaging: "Hộp 10 viên",
//       dosageForm: "viên nén",
//       stockQuantity: 100,
//       use: "Uống sau ăn",
//       dosage: "2 lần/ngày",
//       manufacturer_id: manufacturer._id,
//       medCategory_id: [category._id],
//       medUsage_id: [usage._id],
//       age_group: [], // Add age group if model có
//     });
//     await ImportBatch.create({
//       batchNumber: "BATCH001",
//       importDate: new Date(),
//       expiryDate: new Date("2026-12-31"),
//       quantity: 500,
//       importPrice: 2.5,
//       sellingPrice: 5,
//       status: "active",
//       medicine_id: medicine._id,
//       distributor_id: distributor._id,
//     });
//     console.log("✅ Seed thành công!");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Lỗi seed:", err);
//     process.exit(1);
//   }
// }
// seed();
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const manufacturer_model_1 = __importDefault(require("../model/inventory/manufacturer.model"));
const distributor_model_1 = __importDefault(require("../model/inventory/distributor.model"));
const medicine_category_model_1 = __importDefault(require("../model/medicine/medicine-category.model"));
const medicine_usage_model_1 = __importDefault(require("../model/medicine/medicine-usage.model"));
const medicine_model_1 = __importDefault(require("../model/medicine/medicine.model"));
const import_batch_model_1 = __importDefault(require("../model/inventory/import-batch.model"));
dotenv_1.default.config();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI || "mongodb://localhost:27017/medicine");
            console.log("✅ Kết nối MongoDB thành công");
            const manufacturer = yield manufacturer_model_1.default.create({
                nameCo: "Pfizer",
                country: "USA",
                branch: "New York",
            });
            let distributor = yield distributor_model_1.default.findOne({ nameCO: "Global Pharma" });
            if (!distributor) {
                distributor = yield distributor_model_1.default.create({
                    nameCO: "Global Pharma",
                    address: "123 Main St",
                    phone: "0123456789",
                });
                console.log("✅ Đã tạo Distributor mới");
            }
            else {
                console.log('ℹ️ Distributor "Global Pharma" đã tồn tại, không cần thêm.');
            }
            const category = yield medicine_category_model_1.default.create({
                name: "Thuốc kê đơn",
                icon: "🧫",
            });
            const usage = yield medicine_usage_model_1.default.create({
                name: "Oral",
                icon: "💊",
            });
            const medicine = yield medicine_model_1.default.create({
                code: "MED123",
                name: "Amoxicillin",
                thumbnail: "https://example.com/thumb.jpg",
                packaging: "Hộp 10 viên",
                dosageForm: "viên nén",
                stockQuantity: 100,
                use: "Uống sau ăn",
                dosage: "2 lần/ngày",
                manufacturer_id: manufacturer._id,
                medCategory_id: [category._id],
                medUsage_id: [usage._id],
                age_group: [], // Nếu cần, thêm group tuổi tại đây
            });
            yield import_batch_model_1.default.create({
                batchNumber: "BATCH001",
                importDate: new Date(),
                expiryDate: new Date("2026-12-31"),
                quantity: 500,
                importPrice: 2.5,
                sellingPrice: 5,
                status: "active",
                medicine_id: medicine._id,
                distributor_id: distributor._id,
            });
            console.log("🎉 Seed dữ liệu mẫu thành công!");
            process.exit(0);
        }
        catch (err) {
            console.error("❌ Lỗi khi seed dữ liệu:", err);
            process.exit(1);
        }
    });
}
seed();
