import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};
const getAllProductFromDB = async (searchTerm: string, filter: string) => {
  const query: { [key: string]: string } = {};
  query[searchTerm] = filter;
  const result = await Product.find(query);

  return result;
};
const getProductByIDFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};
export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getProductByIDFromDB,
};
