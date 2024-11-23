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
exports.orderControllers = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const orderZodParseData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.orderService.createOrderIntoDB(orderZodParseData);
        if ('error' in result) {
            res.status(400).json({
                message: 'Order could not be processed due to insufficient stock',
                success: false,
                error: result,
            });
        }
        else {
            res.status(201).json({
                message: 'Order created successfully',
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
                stack: error.stack,
            });
        }
        res.status(422).json({
            message: 'An error occurred while creating the order',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: null,
        });
    }
});
const getOrderRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getOrderRevenueFromDB();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue: result },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.orderControllers = {
    createOrder,
    getOrderRevenue,
};
