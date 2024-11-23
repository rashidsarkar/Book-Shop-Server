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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productID = orderData.product;
    const myQuantity = orderData.quantity;
    const product = yield product_model_1.Product.findById(productID);
    if (product) {
        if (product.quantity < myQuantity) {
            return { error: 'Insufficient stock to fulfill the order' };
        }
    }
    yield product_model_1.Product.findByIdAndUpdate({ _id: productID }, {
        $inc: { quantity: -myQuantity },
        $set: { inStock: product.quantity - myQuantity > 0 },
    }, { new: true });
    const newOrderData = new order_model_1.Order(orderData);
    yield newOrderData.save();
    return newOrderData;
});
const getOrderRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]).project({ totalRevenue: 1 });
    const totalRevenue = Number(((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0);
    return totalRevenue;
});
exports.orderService = {
    createOrderIntoDB,
    getOrderRevenueFromDB,
};
