import { Request, Response } from 'express';
import { productService } from './product.service';
import { productSchemaValidation } from './product.validation';
import { ZodError } from 'zod';

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
        errors: error.errors.map((err) => ({
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
    const searchQuery = req.query;
    let searchTerm: string = '';
    if (Object.keys(searchQuery)[0] == 'category') {
      searchTerm = 'category';
    } else if (Object.keys(searchQuery)[0] == 'title') {
      searchTerm = 'title';
    } else if (Object.keys(searchQuery)[0] == 'author') {
      searchTerm = 'author';
    }

    const filter = searchQuery[searchTerm];
    //TODO - type error

    const result = await productService.getAllProductFromDB(
      searchTerm,
      filter as string,
    );

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
    console.log(upDateData);
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
export const productControllers = {
  createProduct,
  getAllProduct,
  getProductByID,
  updateProductByID,
};
