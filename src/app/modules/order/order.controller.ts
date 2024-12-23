import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderService } from './order.service';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const orderData = req.body;
    const orderZodParseData = orderValidationSchema.parse(orderData);
    const result = await orderService.createOrderIntoDB(orderZodParseData);
    if ('error' in result) {
      res.status(400).json({
        message: 'Order could not be processed due to insufficient stock',
        success: false,
        error: result,
      });
    } else {
      res.status(201).json({
        message: 'Order created successfully',
        success: true,
        data: result,
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
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
};

const getOrderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrderRevenueFromDB();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue: result },
    });
  } catch (error) {
    console.log(error);
  }
};
export const orderControllers = {
  createOrder,
  getOrderRevenue,
};
