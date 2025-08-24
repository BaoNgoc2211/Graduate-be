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
const purchase_order_model_1 = __importDefault(require("../../model/purchase-order.model"));
const import_batch_model_1 = __importDefault(require("../../model/inventory/import-batch.model"));
const stock_model_1 = __importDefault(require("../../model/inventory/stock.model"));
const stock_repository_1 = __importDefault(require("../inventory/stock.repository"));
const medicine_model_1 = __importDefault(require("../../model/medicine/medicine.model"));
class PurchaseOrderRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield purchase_order_model_1.default.find();
        });
    }
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield purchase_order_model_1.default.findById(id);
        });
    }
    create(purchaseOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalPrice = 0;
            const medicineDetails = [];
            for (const medicine of purchaseOrder.medicines) {
                // Lấy thông tin batch nếu có
                let importPriceBatch = medicine.price;
                const batch = yield import_batch_model_1.default.findById(medicine.batch_id);
                if (!importPriceBatch && medicine.batch_id) {
                    if (!batch) {
                        throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
                    }
                    importPriceBatch = batch.importPrice;
                }
                if (!batch) {
                    throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
                }
                const distributor = batch.distributor_id;
                const medicinePackaging = yield medicine_model_1.default.findById(medicine.medicine_id, 'packaging');
                if (!medicinePackaging) {
                    throw new Error(`Không tìm thấy thông tin đóng gói cho thuốc với ID ${medicine.medicine_id}`);
                }
                const importPrice = importPriceBatch;
                const packaging = medicinePackaging === null || medicinePackaging === void 0 ? void 0 : medicinePackaging.packaging;
                const VAT = medicine.VAT_Rate || 0;
                const CK = medicine.CK_Rate || 0;
                const price = Math.round(importPrice * (1 + VAT / 100 - CK / 100));
                const totalAmount = Math.round(price * medicine.quantity * (1 + VAT / 100 - CK / 100));
                totalPrice += totalAmount;
                medicineDetails.push({
                    medicine_id: medicine.medicine_id,
                    quantity: medicine.quantity,
                    importPrice,
                    packaging,
                    VAT_Rate: VAT,
                    CK_Rate: CK,
                    price,
                    totalAmount,
                    batch_id: medicine.batch_id,
                    distributor_id: distributor,
                });
            }
            const newOrder = {
                medicines: medicineDetails,
                date_in: new Date(),
                totalPrice,
                note: purchaseOrder.note || "",
            };
            const createdOrder = yield purchase_order_model_1.default.create(newOrder);
            yield stock_repository_1.default.createStocksFromPurchaseOrder(createdOrder.id);
            return createdOrder;
        });
    }
    update(purchaseOrderId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalPrice = 0;
            const medicineDetails = [];
            for (const medicine of updatedData.medicines) {
                // Lấy thông tin batch nếu có
                let importPriceBatch = medicine.price;
                if (!importPriceBatch && medicine.batch_id) {
                    const batch = yield import_batch_model_1.default.findById(medicine.batch_id);
                    if (!batch) {
                        throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
                    }
                    importPriceBatch = batch.importPrice;
                }
                const medicinePackaging = yield medicine_model_1.default.findById(medicine.medicine_id, 'packaging');
                if (!medicinePackaging) {
                    throw new Error(`Không tìm thấy thông tin đóng gói cho thuốc với ID ${medicine.medicine_id}`);
                }
                const importPrice = importPriceBatch;
                const packaging = medicinePackaging === null || medicinePackaging === void 0 ? void 0 : medicinePackaging.packaging;
                const VAT = medicine.VAT_Rate || 0;
                const CK = medicine.CK_Rate || 0;
                const price = importPrice * (1 + VAT / 100 - CK / 100);
                const totalAmount = price * medicine.quantity * (1 + VAT / 100 - CK / 100);
                totalPrice += totalAmount;
                medicineDetails.push({
                    medicine_id: medicine.medicine_id,
                    quantity: medicine.quantity,
                    importPrice,
                    packaging,
                    VAT_Rate: VAT,
                    CK_Rate: CK,
                    price,
                    totalAmount,
                    batch_id: medicine.batch_id,
                    distributor_id: medicine.distributor_id,
                });
            }
            // Cập nhật lại đơn nhập
            const updatedOrder = yield purchase_order_model_1.default.findByIdAndUpdate(purchaseOrderId, {
                medicines: medicineDetails,
                totalPrice,
                note: updatedData.note || "",
            }, { new: true });
            if (!updatedOrder) {
                throw new Error("Không tìm thấy đơn nhập để cập nhật");
            }
            yield stock_repository_1.default.updateStocksFromPurchaseOrder(purchaseOrderId);
            return updatedOrder;
        });
    }
    delete(purchaseOrderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingOrder = yield purchase_order_model_1.default.findById(purchaseOrderId);
            if (!existingOrder) {
                throw new Error("Không tìm thấy đơn nhập để xóa");
            }
            const relatedStocks = yield stock_model_1.default.find({ purchaseOrder: purchaseOrderId }).lean();
            // Xóa tất cả các bản ghi trong kho liên quan đến đơn nhập này
            yield stock_model_1.default.deleteMany({ purchaseOrder: purchaseOrderId });
            // Xóa đơn nhập kho
            yield purchase_order_model_1.default.findByIdAndDelete(purchaseOrderId);
            const totalQuantityDeleted = relatedStocks.reduce((sum, stock) => sum + stock.quantity, 0);
            return {
                deletedPurchaseOrderId: purchaseOrderId,
                deletedStocks: relatedStocks.map((s) => ({
                    medicine_id: s.medicine,
                    quantity: s.quantity,
                    sellingPrice: s.sellingPrice
                })),
                totalQuantityDeleted,
                deletedAt: new Date()
            };
        });
    }
}
exports.default = new PurchaseOrderRepository();
