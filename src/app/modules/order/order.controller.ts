import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderService } from './order.service';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const orderData = req.body;
    console.log(orderData);
    const orderZodParseData = orderValidationSchema.parse(orderData);

    const result = await orderService.createOrderIntoDB(orderZodParseData);
    res.json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    // Handle general errors
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'An error occurred while creating the order',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
export const orderControllers = {
  createOrder,
};
