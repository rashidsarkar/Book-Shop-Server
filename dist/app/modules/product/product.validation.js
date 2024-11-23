"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemaValidation = void 0;
const zod_1 = require("zod");
exports.productSchemaValidation = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required',
    }),
    author: zod_1.z
        .string({
        required_error: 'Author is required',
    })
        .trim(),
    price: zod_1.z
        .number({
        required_error: 'Price is required',
    })
        .positive('Price must be a positive number'),
    category: zod_1.z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        required_error: 'Category is required',
        invalid_type_error: 'Invalid category',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
    }),
    quantity: zod_1.z
        .number({
        required_error: 'Quantity is required',
    })
        .nonnegative('Quantity must be a non-negative number'),
    inStock: zod_1.z.boolean({
        required_error: 'InStock is required',
    }),
    // isDeleted: z.boolean().default(false),
});
