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
const import_batch_model_1 = __importDefault(require("../../model/inventory/import-batch.model"));
const stock_model_1 = __importDefault(require("../../model/inventory/stock.model"));
const purchase_order_model_1 = __importDefault(require("../../model/purchase-order.model"));
const date_fns_1 = require("date-fns");
class StockRepository {
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield stock_model_1.default.countDocuments();
            const items = yield stock_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("medicine", "code name thumbnail dosageForm packaging");
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    getLowStock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stock_model_1.default.find({ quantity: { $lte: 10 } }).populate("medicine", "code name thumbnail dosageForm packaging ");
        });
    }
    createStock(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const purchaseOrder = PurchaseOrder.findById(data.purchaseOrder);
            // purchaseOrder.
            // const stock :IStock = {
            //     medicine: data.medicine,
            //     purchaseOrder: data.purchaseOrder,
            //     quantity: purchaseOrder.medic,
            return yield stock_model_1.default.create(data);
        });
    }
    createStocksFromPurchaseOrder(purchaseOrderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield purchase_order_model_1.default.findById(purchaseOrderId).lean();
            if (!order)
                throw new Error("Không tìm thấy đơn nhập");
            const currentDate = new Date();
            yield Promise.all(order.medicines.map((med) => __awaiter(this, void 0, void 0, function* () {
                const basePrice = med.price;
                let sellingPrice = basePrice * 1.4; // +40% lợi nhuận
                // Tìm thông tin lô nhập của thuốc (giả định có trường importBatch)
                const importBatch = yield import_batch_model_1.default.findOne({
                    medicine: med.medicine_id,
                    packaging: med.packaging,
                }).lean();
                if (importBatch && importBatch.expiryDate) {
                    const expiryDate = new Date(importBatch.expiryDate);
                    const thresholdDate = (0, date_fns_1.addMonths)(currentDate, 3); // 3 tháng tới
                    // Nếu thuốc sắp hết hạn thì giảm giá 20%
                    if ((0, date_fns_1.isBefore)(expiryDate, thresholdDate)) {
                        sellingPrice *= 0.8;
                    }
                }
                return new stock_model_1.default({
                    medicine: med.medicine_id,
                    purchaseOrder: purchaseOrderId,
                    quantity: med.quantity,
                    packaging: med.packaging,
                    sellingPrice: Math.round(sellingPrice), // làm tròn nếu cần
                }).save();
            })));
        });
    }
    updateStocksFromPurchaseOrder(purchaseOrderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield purchase_order_model_1.default.findById(purchaseOrderId).lean();
            if (!order)
                throw new Error("Không tìm thấy đơn nhập");
            for (const med of order.medicines) {
                const stock = yield stock_model_1.default.findOne({
                    medicine: med.medicine_id,
                    purchaseOrder: purchaseOrderId,
                });
                if (stock) {
                    // Cập nhật số lượng và giá bán
                    stock.quantity = med.quantity;
                    stock.sellingPrice = med.price;
                    yield stock.save();
                }
                else {
                    // Nếu không tìm thấy stock, tạo mới
                    yield new stock_model_1.default({
                        medicine: med.medicine_id,
                        purchaseOrder: purchaseOrderId,
                        quantity: med.quantity,
                        // packaging: med.packaging,
                        sellingPrice: med.price,
                    }).save();
                }
            }
            return yield stock_model_1.default.find({ purchaseOrder: purchaseOrderId });
        });
    }
    deleteStock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield stock_model_1.default.findByIdAndDelete(id);
            return stock;
        });
    }
    findByMedicineId(medicineId) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield stock_model_1.default.find({ medicine: medicineId })
                .populate({
                path: "medicine",
                select: "code name thumbnail dosageForm packaging",
                populate: {
                    path: "manufacturer_id",
                    select: "nameCo"
                }
            });
            if (!stock) {
                throw new Error(`Stock not found for medicine ID: ${medicineId}`);
            }
            return stock;
        });
    }
}
exports.default = new StockRepository();
