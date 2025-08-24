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
const upload_services_1 = __importDefault(require("../service/upload.services"));
const response_1 = require("../util/response");
const catch_error_1 = __importDefault(require("../util/catch_error"));
class UploadController {
    constructor() {
        this.uploadPrescription = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                res.status(400).json({ message: "No file upload" });
                return;
            }
            const medicines = yield upload_services_1.default.uploadPrescription(req.file.path);
            (0, response_1.returnRes)(res, 200, "Upload prescription successful!", medicines);
        });
    }
    uploadSingle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).json({
                        message: "No file upload",
                    });
                    return;
                }
                const url = yield upload_services_1.default.uploadSingle(req.file.path);
                res.status(200).json({
                    message: "Upload single successful!",
                    data: url,
                });
            }
            catch (error) {
                (0, catch_error_1.default)(res, error);
            }
        });
    }
    uploadMultiple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.files || req.files.length === 0) {
                    res.status(400).json({ message: "No files uploaded" });
                    return;
                }
                const url = yield upload_services_1.default.uploadMultiple(req.files.map((file) => file.path));
                res.status(200).json({
                    message: "Upload multiple successful!",
                    data: url,
                });
            }
            catch (error) {
                (0, catch_error_1.default)(res, error);
            }
        });
    }
}
const uploadController = new UploadController();
exports.default = uploadController;
