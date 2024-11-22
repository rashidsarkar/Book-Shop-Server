import { TProduct } from '../product/product.interface';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const productID = orderData.product;
  const myQuantity = orderData.quantity;
  const product: TProduct | null = await Product.findById(productID);
  if (product) {
    if (product.quantity < myQuantity) {
      return { error: 'Insufficient stock to fulfill the order' };
    }
  }

  await Product.findByIdAndUpdate(
    { _id: productID },
    {
      $inc: { quantity: -myQuantity },
      $set: { inStock: product!.quantity - myQuantity > 0 },
    },
    { new: true },
  );
  const newOrderData = new Order(orderData);
  await newOrderData.save();

  return newOrderData;
};

export const orderService = {
  createOrderIntoDB,
};