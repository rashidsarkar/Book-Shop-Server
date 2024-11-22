import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({ message: 'Invalid email address format.' }),

  quantity: z
    .number({ message: 'Quantity must be a number.' })
    .int({ message: 'Quantity must be an integer.' })
    .positive({ message: 'Quantity must be greater than zero.' }),
  totalPrice: z
    .number({ message: 'Total price must be a number.' })
    .nonnegative({ message: 'Total price must be zero or greater.' })
    .refine((value) => value > 0, {
      message: 'Total price must be greater than zero.',
    }),
  product: z.string({
    required_error: 'Product is required.',
  }),
});

export default orderValidationSchema;
