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
const order_model_1 = __importDefault(require("../../model/order/order.model"));
const order_detail_model_1 = __importDefault(require("../../model/order/order.detail.model"));
const user_model_1 = __importDefault(require("../../model/auth/user.model"));
const stock_model_1 = __importDefault(require("../../model/inventory/stock.model"));
const cart_model_1 = __importDefault(require("../../model/order/cart.model"));
const shipping_model_1 = __importDefault(require("../../model/shipping.model"));
const order_enum_1 = require("../../enum/order/order.enum");
const voucher_model_1 = __importDefault(require("../../model/voucher.model"));
const mongoose_1 = require("mongoose");
class OrderDetailRepository {
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield order_model_1.default.countDocuments();
            const items = yield order_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findById(id);
            return order;
        });
    }
    checkOutVNPAY(userId, selectItemIds, shippingId, paymentMethod, voucherCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
            if (!cart || cart.medicine_item.length === 0) {
                throw new Error("Giỏ hàng trống hoặc không tìm thấy");
            }
            const selectedItems = cart.medicine_item.filter((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.medicine_id) === null || _a === void 0 ? void 0 : _a.id) && selectItemIds.includes(item.medicine_id.id.toString()); });
            if (selectedItems.length === 0) {
                throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
            }
            const shipping = yield shipping_model_1.default.findById(shippingId);
            if (!shipping) {
                throw new Error("Không tìm thấy thông tin vận chuyển");
            }
            const orderItems = [];
            let totalAmount = 0;
            for (const item of selectedItems) {
                const medicine = item.medicine_id;
                const stock = yield stock_model_1.default.findById(medicine.stock_id);
                if (!stock) {
                    throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
                }
                if (stock.quantity < item.quantity) {
                    throw new Error(`Sản phẩm ${medicine.name} chỉ còn ${stock.quantity} trong kho`);
                }
                const itemPrice = stock.sellingPrice;
                const itemQuantity = Number(item.quantity);
                const totalForItem = itemPrice * itemQuantity;
                totalAmount += totalForItem;
                orderItems.push({
                    medicine_id: medicine.id,
                    stock_id: medicine.stock_id,
                    thumbnail: medicine.thumbnail,
                    name: medicine.name,
                    price: itemPrice,
                    quantity: itemQuantity,
                    totalAmount: totalForItem,
                    note: "",
                });
            }
            let discountVoucher = 0;
            if (voucherCode) {
                const voucher = yield voucher_model_1.default.findOne({ _id: voucherCode });
                const now = new Date();
                if (!voucher || !voucher.isActive ||
                    now < new Date(voucher.startDate) || now > new Date(voucher.endDate) ||
                    // voucher.usedCount >= voucher.usageLimit ||
                    totalAmount < voucher.minOrderValue) {
                    throw new Error("Voucher không hợp lệ hoặc đã hết hạn");
                }
                if (voucher.discountType === "PERCENTAGE") {
                    discountVoucher = (totalAmount * voucher.discountValue) / 100;
                    if (voucher.maxDiscountValue && discountVoucher > voucher.maxDiscountValue) {
                        discountVoucher = voucher.maxDiscountValue;
                    }
                }
                else if (voucher.discountType === "FIXED") {
                    discountVoucher = voucher.maxDiscountValue;
                }
                voucher.usageLimit -= 1;
                if (voucher.usageLimit <= 0) {
                    voucher.isActive = false;
                }
                voucher.usedCount += 1;
                yield voucher.save();
            }
            const finalAmount = totalAmount + shipping.price - discountVoucher;
            const orderDetail = yield new order_detail_model_1.default({
                order_items: orderItems,
                totalOrder: totalAmount,
            }).save();
            const order = yield new order_model_1.default({
                user_id: userId,
                status: "đang chờ xác nhận",
                shipping_id: shippingId,
                voucher_id: voucherCode,
                totalAmount,
                finalAmount: finalAmount,
                orderDetail: orderDetail._id,
                paymentMethod,
                paymentStatus: order_enum_1.PaymentStatus.UNPAID, // Cập nhật trạng thái thanh toán
            }).save();
            return {
                orderId: order._id,
                orderItems: orderItems,
                finalAmount: order.finalAmount, // Tổng số tiền bao gồm vận chuyển
                paymentMethod: order.paymentMethod,
            };
        });
    }
    checkOutCOD(userId, selectItemIds, shippingId, paymentMethod, voucherCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
            if (!cart || cart.medicine_item.length === 0) {
                throw new Error("Giỏ hàng trống hoặc không tìm thấy");
            }
            const selectedItems = cart.medicine_item.filter((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.medicine_id) === null || _a === void 0 ? void 0 : _a.id) && selectItemIds.includes(item.medicine_id.id.toString()); });
            if (selectedItems.length === 0) {
                throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
            }
            const shipping = yield shipping_model_1.default.findById(shippingId);
            if (!shipping) {
                throw new Error("Không tìm thấy thông tin vận chuyển");
            }
            const orderItems = [];
            let totalAmount = 0;
            for (const item of selectedItems) {
                const medicine = item.medicine_id;
                const stockId = medicine.stock_id;
                const stock = yield stock_model_1.default.findById(stockId);
                if (!stock) {
                    throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
                }
                if (stock.quantity < item.quantity) {
                    throw new Error(`Sản phẩm ${medicine.name} chỉ còn ${stock.quantity} trong kho`);
                }
                stock.quantity -= item.quantity;
                yield stock.save();
                const itemPrice = stock.sellingPrice;
                const itemQuantity = Number(item.quantity);
                const totalForItem = itemPrice * itemQuantity;
                totalAmount += totalForItem;
                orderItems.push({
                    medicine_id: medicine.id,
                    stock_id: stockId,
                    thumbnail: medicine.thumbnail,
                    name: medicine.name,
                    price: itemPrice,
                    quantity: itemQuantity,
                    totalAmount: totalForItem,
                    note: "",
                });
            }
            let discountVoucher = 0;
            if (voucherCode) {
                const voucher = yield voucher_model_1.default.findOne({ _id: voucherCode });
                const now = new Date();
                if (!voucher || !voucher.isActive ||
                    now < new Date(voucher.startDate) || now > new Date(voucher.endDate) ||
                    // voucher.usedCount >= voucher.usageLimit ||
                    totalAmount < voucher.minOrderValue) {
                    throw new Error("Voucher không hợp lệ hoặc đã hết hạn");
                }
                if (voucher.discountType === "PERCENTAGE") {
                    discountVoucher = (totalAmount * voucher.discountValue) / 100;
                    if (voucher.maxDiscountValue && discountVoucher > voucher.maxDiscountValue) {
                        discountVoucher = voucher.maxDiscountValue;
                    }
                }
                else if (voucher.discountType === "FIXED") {
                    discountVoucher = voucher.maxDiscountValue;
                }
                voucher.usageLimit -= 1;
                if (voucher.usageLimit <= 0) {
                    voucher.isActive = false;
                }
                voucher.usedCount += 1;
                yield voucher.save();
            }
            const finalAmount = totalAmount + shipping.price - discountVoucher;
            const orderDetail = yield new order_detail_model_1.default({
                order_items: orderItems,
                totalOrder: totalAmount,
            }).save();
            const order = yield new order_model_1.default({
                user_id: userId,
                status: "đang chờ xác nhận",
                shipping_id: shippingId,
                voucher_id: voucherCode,
                totalAmount: totalAmount,
                finalAmount: finalAmount, // Tổng số tiền bao gồm vận chuyển và giảm giá
                orderDetail: orderDetail._id,
                paymentMethod, // Thêm phương thức thanh toán
                paymentStatus: order_enum_1.PaymentStatus.UNPAID, // Cập nhật trạng thái thanh toán
            }).save();
            cart.medicine_item = cart.medicine_item.filter((item) => { var _a, _b; return !selectItemIds.includes((_b = (_a = item === null || item === void 0 ? void 0 : item.medicine_id) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString()); });
            cart.quantity = cart.medicine_item.reduce((sum, item) => sum + item.quantity, 0);
            yield cart.save();
            return {
                order
            };
        });
    }
    checkOutMOMO(userId, selectItemIds, shippingId, paymentMethod, voucherCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
            if (!cart || cart.medicine_item.length === 0) {
                throw new Error("Giỏ hàng trống hoặc không tìm thấy");
            }
            const selectedItems = cart.medicine_item.filter((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.medicine_id) === null || _a === void 0 ? void 0 : _a.id) && selectItemIds.includes(item.medicine_id.id.toString()); });
            if (selectedItems.length === 0) {
                throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
            }
            const shipping = yield shipping_model_1.default.findById(shippingId);
            if (!shipping) {
                throw new Error("Không tìm thấy thông tin vận chuyển");
            }
            const orderItems = [];
            let totalAmount = 0;
            for (const item of selectedItems) {
                const medicine = item.medicine_id;
                const stock = yield stock_model_1.default.findById(medicine.stock_id);
                if (!stock) {
                    throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
                }
                if (stock.quantity < item.quantity) {
                    throw new Error(`Sản phẩm ${medicine.name} chỉ còn ${stock.quantity} trong kho`);
                }
                const itemPrice = stock.sellingPrice;
                const itemQuantity = Number(item.quantity);
                const totalForItem = itemPrice * itemQuantity;
                totalAmount += totalForItem;
                orderItems.push({
                    medicine_id: medicine.id,
                    stock_id: medicine.stock_id,
                    thumbnail: medicine.thumbnail,
                    name: medicine.name,
                    price: itemPrice,
                    quantity: itemQuantity,
                    totalAmount: totalForItem,
                    note: "",
                });
            }
            let discountVoucher = 0;
            if (voucherCode) {
                const voucher = yield voucher_model_1.default.findOne({ _id: voucherCode });
                const now = new Date();
                if (!voucher || !voucher.isActive ||
                    now < new Date(voucher.startDate) || now > new Date(voucher.endDate) ||
                    // voucher.usedCount >= voucher.usageLimit ||
                    totalAmount < voucher.minOrderValue) {
                    throw new Error("Voucher không hợp lệ hoặc đã hết hạn");
                }
                if (voucher.discountType === "PERCENTAGE") {
                    discountVoucher = (totalAmount * voucher.discountValue) / 100;
                    if (voucher.maxDiscountValue && discountVoucher > voucher.maxDiscountValue) {
                        discountVoucher = voucher.maxDiscountValue;
                    }
                }
                else if (voucher.discountType === "FIXED") {
                    discountVoucher = voucher.maxDiscountValue;
                }
                voucher.usageLimit -= 1;
                if (voucher.usageLimit <= 0) {
                    voucher.isActive = false;
                }
                voucher.usedCount += 1;
                yield voucher.save();
            }
            const finalAmount = totalAmount + shipping.price - discountVoucher;
            const orderDetail = yield new order_detail_model_1.default({
                order_items: orderItems,
                totalOrder: totalAmount,
            }).save();
            const order = yield new order_model_1.default({
                user_id: userId,
                status: "đang chờ xác nhận",
                shipping_id: shippingId,
                voucher_id: voucherCode,
                totalAmount,
                finalAmount: finalAmount,
                orderDetail: orderDetail._id,
                paymentMethod,
                paymentStatus: order_enum_1.PaymentStatus.UNPAID, // Cập nhật trạng thái thanh toán
            }).save();
            return {
                orderId: order._id,
                orderItems: orderItems,
                finalAmount: order.finalAmount, // Tổng số tiền bao gồm vận chuyển
                paymentMethod: order.paymentMethod,
            };
        });
    }
    checkOutSuccess(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const order = yield order_model_1.default.findById(orderId)
                .populate({
                path: "orderDetail",
                populate: {
                    path: "order_items.medicine_id"
                }
            });
            if (!order) {
                throw new Error("Không tìm thấy đơn hàng");
            }
            const orderDetails = order.orderDetail;
            if (!((_a = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.order_items) === null || _a === void 0 ? void 0 : _a.length)) {
                throw new Error("Đơn hàng không có sản phẩm nào");
            }
            // Cập nhật tồn kho
            for (const item of orderDetails.order_items) {
                const stock = yield stock_model_1.default.findById(item.stock_id);
                if (!stock) {
                    throw new Error(`Không tìm thấy tồn kho cho thuốc ${item.name}`);
                }
                if (stock.quantity < item.quantity) {
                    throw new Error(`Tồn kho của thuốc ${item.name} không đủ`);
                }
                stock.quantity -= item.quantity;
                yield stock.save();
            }
            // Xóa sản phẩm đã mua khỏi giỏ hàng
            const cart = yield cart_model_1.default.findOne({ user_id: order.user_id })
                .populate("medicine_item.medicine_id");
            if (cart) {
                cart.medicine_item = cart.medicine_item.filter((ci) => {
                    return !orderDetails.order_items.some((oi) => {
                        const med = oi.medicine_id;
                        const oiMedId = med instanceof mongoose_1.Types.ObjectId ? med.toString() : med.id.toString();
                        return oiMedId === ci.medicine_id.id.toString();
                    });
                });
                cart.quantity = cart.medicine_item.reduce((sum, item) => sum + item.quantity, 0);
                yield cart.save();
            }
            // Cập nhật trạng thái thanh toán
            order.paymentStatus = order_enum_1.PaymentStatus.PAID;
            yield order.save();
            return {
                message: "Thanh toán thành công và cập nhật đơn hàng",
                order,
            };
        });
    }
    // async checkOutSuccess(orderId: string) {
    //   const order = await Order.findById(orderId).populate("orderDetail");
    //   if (!order) {
    //     throw new Error("Không tìm thấy đơn hàng");
    //   }
    //    const orderDetails = order.orderDetail;
    //   for (const item of orderDetails.order_items) {
    //     const stock = await Stock.findById(item.stock_id);
    //     if (!stock) {
    //       throw new Error(`Không tìm thấy tồn kho cho thuốc ${item.name}`);
    //     }
    //     stock.quantity -= item.quantity;
    //     await stock.save();
    //   }
    //   const cart = await Cart.findOne({ user_id: order.user_id }).populate("medicine_item.medicine_id");
    //   if (cart) {
    //   cart.medicine_item = cart.medicine_item.filter(
    //     (ci: ICartItem) =>
    //       !orderDetails.order_items.some(
    //         (oi: any) => oi.medicine_id.toString() === ci.medicine_id._id.toString()
    //       )
    //   );
    //     cart.quantity = cart.medicine_item.reduce((sum: number, item: any) => sum + item.quantity, 0);
    //     await cart.save();
    //   }
    //   order.paymentStatus = PaymentStatus.PAID;
    //   await order.save();
    //   return {
    //     message: "Thanh toán thành công và cập nhật đơn hàng",
    //     order,
    //   };
    // }
    reviewOrder(userId, selectItemIds, shippingId, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
            if (!cart || cart.medicine_item.length === 0) {
                throw new Error("Giỏ hàng trống hoặc không tìm thấy");
            }
            const user = yield user_model_1.default.findById(userId).select("info.name info.phone info.address");
            if (!user) {
                throw new Error("Người dùng không tồn tại");
            }
            const shipping = yield shipping_model_1.default.findById(shippingId);
            if (!shipping) {
                throw new Error("Không tìm thấy thông tin vận chuyển");
            }
            const selectedItems = cart.medicine_item.filter((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.medicine_id) === null || _a === void 0 ? void 0 : _a.id) && selectItemIds.includes(item.medicine_id.id.toString()); });
            if (selectedItems.length === 0) {
                throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
            }
            const orderItemsReview = [];
            let totalAmount = 0;
            for (const item of selectedItems) {
                const medicine = item.medicine_id;
                const stockId = medicine.stock_id;
                const stock = yield stock_model_1.default.findById(stockId);
                if (!stock) {
                    throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
                }
                if (stock.quantity < item.quantity) {
                    throw new Error(`Sản phẩm ${medicine.name} chỉ còn ${stock.quantity} trong kho`);
                }
                const itemPrice = stock.sellingPrice;
                const itemQuantity = Number(item.quantity);
                const totalForItem = itemPrice * itemQuantity;
                totalAmount += totalForItem;
                orderItemsReview.push({
                    medicine_id: medicine.id,
                    stock_id: stockId,
                    thumbnail: medicine.thumbnail,
                    name: medicine.name,
                    price: itemPrice,
                    quantity: itemQuantity,
                    totalAmount: totalForItem,
                    note: "",
                });
            }
            return {
                userInfo: {
                    name: user.info.name,
                    phone: user.info.phone,
                    address: user.info.address,
                },
                orderItemsReview: orderItemsReview,
                shipping: shipping,
                totalAmount: totalAmount + shipping.price,
                paymentMethod: paymentMethod, // Thêm phương thức thanh toán
            };
        });
    }
    checkStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default.find({ user_id: userId }).sort({ createdAt: -1 }).populate("shipping_id", "type price");
            const userInfo = yield user_model_1.default.findById(userId).select("info.name info.phone info.address");
            if (!orders || orders.length === 0) {
                throw new Error("Người dùng chưa có đơn hàng nào.");
            }
            // Lấy danh sách các ID của orderDetail từ các đơn hàng
            const orderDetailIds = orders.map(order => order.orderDetail);
            // Tìm tất cả OrderDetail tương ứng
            const orderDetails = yield order_detail_model_1.default.find({ _id: { $in: orderDetailIds } });
            // Tạo Map để tra nhanh
            const orderDetailMap = new Map();
            orderDetails.forEach(detail => {
                orderDetailMap.set(detail._id.toString(), detail);
            });
            // Trả về kết quả đã ghép nối
            const result = orders.map(order => {
                const detail = orderDetailMap.get(order.orderDetail.toString());
                return {
                    userId: userInfo,
                    orderId: order._id,
                    status: order.status,
                    totalAmount: order.totalAmount,
                    finalAmount: order.finalAmount,
                    paymentMethod: order.paymentMethod,
                    shippingMethod: order.shipping_id,
                    items: detail === null || detail === void 0 ? void 0 : detail.order_items.map((item) => ({
                        order_item: item.medicine_id,
                        medicineName: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.totalAmount,
                        thumbnail: item.thumbnail,
                    })),
                    orderDetailId: order.orderDetail,
                };
            });
            return result;
        });
    }
    checkStatusOrderUser(userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default.find({ user_id: userId, status }).sort({ createdAt: -1 }).populate("shipping_id", "type price");
            ;
            const userInfo = yield user_model_1.default.findById(userId).select("info.name info.phone info.address");
            if (!orders || orders.length === 0) {
                throw new Error("Người dùng chưa có đơn hàng nào.");
            }
            // Lấy danh sách các ID của orderDetail từ các đơn hàng
            const orderDetailIds = orders.map(order => order.orderDetail); // <-- sửa theo đúng tên field trong Order
            // Tìm tất cả OrderDetail tương ứng
            const orderDetails = yield order_detail_model_1.default.find({ _id: { $in: orderDetailIds } });
            // Tạo Map để tra nhanh
            const orderDetailMap = new Map();
            orderDetails.forEach(detail => {
                orderDetailMap.set(detail._id.toString(), detail);
            });
            // Trả về kết quả đã ghép nối
            const result = orders.map(order => {
                const detail = orderDetailMap.get(order.orderDetail.toString());
                return {
                    userId: userInfo,
                    orderId: order._id,
                    status: order.status,
                    paymentMethod: order.paymentMethod,
                    shippingMethod: order.shipping_id,
                    totalAmount: order.totalAmount,
                    finalAmount: order.finalAmount,
                    items: detail === null || detail === void 0 ? void 0 : detail.order_items.map((item) => ({
                        order_item: item.medicine_id,
                        medicineName: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.totalAmount,
                        thumbnail: item.thumbnail,
                    })),
                };
            });
            return result;
        });
    }
    updateOrder(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findByIdAndDelete(id);
            return order;
        });
    }
    checkStatusOrder(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default.find({ status }).sort({ createdAt: -1 }).populate("shipping_id", "type price");
            ;
            if (!orders || orders.length === 0) {
                throw new Error("Người dùng chưa có đơn hàng nào.");
            }
            // Lấy danh sách các ID của orderDetail từ các đơn hàng
            const orderDetailIds = orders.map(order => order.orderDetail); // <-- sửa theo đúng tên field trong Order
            // Tìm tất cả OrderDetail tương ứng
            const orderDetails = yield order_detail_model_1.default.find({ _id: { $in: orderDetailIds } });
            // Tạo Map để tra nhanh
            const orderDetailMap = new Map();
            orderDetails.forEach(detail => {
                orderDetailMap.set(detail._id.toString(), detail);
            });
            // Trả về kết quả đã ghép nối
            const result = orders.map(order => {
                const detail = orderDetailMap.get(order.orderDetail.toString());
                return {
                    orderId: order._id,
                    status: order.status,
                    paymentMethod: order.paymentMethod,
                    shippingMethod: order.shipping_id,
                    totalAmount: order.totalAmount,
                    finalAmount: order.finalAmount,
                    items: detail === null || detail === void 0 ? void 0 : detail.order_items.map((item) => ({
                        order_item: item.medicine_id,
                        medicineName: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.totalAmount,
                        thumbnail: item.thumbnail,
                    })),
                    orderDetailId: order.orderDetail,
                };
            });
            return result;
        });
    }
}
exports.default = new OrderDetailRepository();
