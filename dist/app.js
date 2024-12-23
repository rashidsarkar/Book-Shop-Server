"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_route_1.productRoutes);
app.use('/api/orders', order_route_1.orderRoutes);
app.get('/', (req, res) => {
    res.send('Hello World from book!');
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        error: { message: 'Route not found' },
        stack: null,
    });
});
exports.default = app;
