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
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getAllProductFromDB = (searchItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = searchItem;
    if (!searchTerm) {
        const result = yield product_model_1.Product.find();
        return result;
    }
    else {
        const result = yield product_model_1.Product.aggregate([
            {
                $match: {
                    $or: [
                        { title: searchTerm },
                        { author: searchTerm },
                        { category: searchTerm },
                    ],
                },
            },
        ]);
        return result;
    }
});
const getProductByIDFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductByIDFromDB = (id, upDateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, upDateData, { new: true });
    return result;
});
const deleteProductByIDFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.productService = {
    createProductIntoDB,
    getAllProductFromDB,
    getProductByIDFromDB,
    updateProductByIDFromDB,
    deleteProductByIDFromDB,
};
