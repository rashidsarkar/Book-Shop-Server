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
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const zod_1 = require("zod");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productZodParseData = product_validation_1.productSchemaValidation.parse(productData);
        const result = yield product_service_1.productService.createProductIntoDB(productZodParseData);
        res.json({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
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
        // Handle general errors
        console.error('Error creating product:', error);
        res.status(500).json({
            message: 'An error occurred while creating the product',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: null,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.getAllProductFromDB(req.query);
        res.json({
            message: 'Book retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching Book ',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: null,
        });
    }
});
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getProductByIDFromDB(productId);
        res.json({
            message: 'Book retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'An error occurred while fetching Book ',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: null,
        });
    }
});
const updateProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const upDateData = req.body;
        const result = yield product_service_1.productService.updateProductByIDFromDB(productId, upDateData);
        res.json({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while fetching Book ',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: null,
        });
    }
});
const deleteProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.deleteProductByIDFromDB(productId);
        console.log(result + 'from con');
        if (result) {
            res.status(200).json({
                message: 'Book deleted successfully.',
                success: true,
                data: {},
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to delete the Book. Please try again.',
                success: false,
                data: {},
                stack: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching Book ',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: null,
        });
    }
});
exports.productControllers = {
    createProduct,
    getAllProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
};
