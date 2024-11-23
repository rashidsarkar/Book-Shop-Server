import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};
const getAllProductFromDB = async (searchItem: Record<string, unknown>) => {
  const { searchTerm } = searchItem;
  if (!searchTerm) {
    const result = await Product.find();
    return result;
  } else {
    const result = await Product.aggregate([
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
};
const getProductByIDFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};
const updateProductByIDFromDB = async (id: string, upDateData: object) => {
  const result = await Product.findByIdAndUpdate(id, upDateData, { new: true });

  return result;
};
const deleteProductByIDFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getProductByIDFromDB,
  updateProductByIDFromDB,
  deleteProductByIDFromDB,
};
