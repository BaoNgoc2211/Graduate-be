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
const cloudinary_1 = require("cloudinary");
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
class UploadServices {
    uploadSingle(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.v2.uploader.upload(image, {
                folder: "medicine",
            });
            return result.secure_url;
        });
    }
    uploadMultiple(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Promise.all(image.map((img) => cloudinary_1.v2.uploader.upload(img, { folder: "medicine" })));
            return result.map((rs) => rs.secure_url);
        });
    }
    uploadPrescription(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Tạo đường dẫn ảnh tạm sau khi xử lý
            const processedImagePath = imagePath.replace(/(\.\w+)$/, '_processed$1');
            // Xử lý ảnh bằng Sharp
            yield (0, sharp_1.default)(imagePath)
                .resize({ width: 1000 }) // resize ảnh về kích thước tiêu chuẩn
                .grayscale() // chuyển sang ảnh đen trắng
                .normalize() // tăng tương phản, làm rõ nét         
                .threshold(150) // nhị phân hóa ảnh (giảm nhiễu)
                .toFile(processedImagePath);
            // OCR bằng Tesseract
            const ocrResult = yield tesseract_js_1.default.recognize(processedImagePath, 'eng+vie');
            const rawText = ocrResult.data.text;
            // Xóa ảnh tạm sau xử lý
            yield promises_1.default.unlink(processedImagePath);
            // Trích xuất thuốc
            return this.extractMedicines(rawText);
        });
    }
    extractMedicines(text) {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const result = [];
        // Từ điển sửa lỗi chính tả OCR
        const unitMap = {
            'vien': 'viên',
            'vién': 'viên',
            'viem': 'viên',
            'gói': 'gói',
            'goi': 'gói',
            'chai': 'chai',
            'chal': 'chai',
            'ống': 'ống',
            'ong': 'ống',
            'ông': 'ống',
            'tuyp': 'tuýp',
            'tuýp': 'tuýp'
        };
        for (let line of lines) {
            // Bước 1: Làm sạch dòng
            line = line.replace(/(\d)([^\d\s]+)/g, '$1 $2'); // thêm khoảng cách giữa số & chữ
            line = line.replace(/^\s*\d+[.:]?\s*/, ''); // loại bỏ số thứ tự đầu dòng
            const match = line.match(/^(.+?)\s+(\d+)\s*(\S+)?$/i);
            if (match) {
                let medicineName = match[1].trim().replace(/^\.?\s*/, ''); // xóa dấu chấm đầu dòng
                medicineName = medicineName.replace(/([a-zA-Z])(\d)/g, '$1 $2'); // chèn khoảng trắng tên và số
                const quantity = Number(match[2]);
                const rawUnit = match[3].toLowerCase() || "";
                const unit = unitMap[rawUnit] || "";
                result.push({ medicineName, quantity, unit });
            }
        }
        return result;
    }
}
const uploadService = new UploadServices();
exports.default = uploadService;
