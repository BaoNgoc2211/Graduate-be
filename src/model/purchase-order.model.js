"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const medicineItemSchema = new mongoose_1.Schema({
    medicine_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    importPrice: {
        type: Number,
        required: true,
    },
    packaging: {
        type: String,
        required: true, // Ví dụ đơn vị tính mặc định là "viên"
    },
    VAT_Rate: {
        type: Number,
        default: 0,
    },
    CK_Rate: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    batch_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ImportBatch",
    },
    distributor_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Distributor",
    }
}, { _id: false });
const purchaseOrder = new mongoose_1.Schema({
    medicines: [medicineItemSchema],
    date_in: {
        type: Date,
    },
    totalPrice: {
        type: Number
    },
    note: {
        type: String,
    }
}, {
    collection: "PurchaseOrder",
    timestamps: true
});
const PurchaseOrder = mongoose_1.default.model("PurchaseOrder", purchaseOrder);
exports.default = PurchaseOrder;
