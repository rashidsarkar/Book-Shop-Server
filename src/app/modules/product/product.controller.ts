import { Request, Response } from 'express';
import { productService } from './product.service';
import { productSchemaValidation } from './product.validation';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const productData = req.body;
    console.log();
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
      });
    }

    // Handle general errors
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'An error occurred while creating the product',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    // const { searchTerm } = req.query;

    const result = await productService.getAllProductFromDB(req.query);

    res.json({
      message: 'Book retrieved successfully',
      success: true,
      data: result, // The data is the result of the service call
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
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
      data: result, // The data is the result of the service call
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
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
      data: result, // The data is the result of the service call
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.deleteProductByIDFromDB(productId);
    console.log(result + 'from con');
    //TODO -  result nea kaj korte hobe
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
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
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
