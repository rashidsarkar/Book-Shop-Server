"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required.',
    })
        .email({ message: 'Invalid email address format.' }),
    quantity: zod_1.z
        .number({ message: 'Quantity must be a number.' })
        .int({ message: 'Quantity must be an integer.' })
        .positive({ message: 'Quantity must be greater than zero.' }),
    totalPrice: zod_1.z
        .number({ message: 'Total price must be a number.' })
        .nonnegative({ message: 'Total price must be zero or greater.' })
        .refine((value) => value > 0, {
        message: 'Total price must be greater than zero.',
    }),
    product: zod_1.z.string({
        required_error: 'Product is required.',
    }),
});
exports.default = orderValidationSchema;
