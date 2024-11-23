import { Request, Response } from 'express';
import { productService } from './product.service';
import { productSchemaValidation } from './product.validation';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const productData = req.body;
    const productZodParseData = productSchemaValidation.parse(productData);
    const result =
      await productService.createProductIntoDB(productZodParseData);
    res.json({
      message: 'Book created successfully',
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
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductFromDB(req.query);
    res.json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};

const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getProductByIDFromDB(productId);
    res.json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};
const updateProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const upDateData: object = req.body;
    const result = await productService.updateProductByIDFromDB(
      productId,
      upDateData,
    );
    res.json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};
const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.deleteProductByIDFromDB(productId);
    console.log(result + 'from con');
    if (result) {
      res.status(200).json({
        message: 'Book deleted successfully.',
        success: true,
        data: {},
      });
    } else {
      res.status(400).json({
        message: 'Failed to delete the Book. Please try again.',
        success: false,
        data: {},
        stack: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProduct,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
