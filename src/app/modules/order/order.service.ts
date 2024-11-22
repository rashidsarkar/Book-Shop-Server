import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const productID = orderData.product;
};

export const orderService = {
  createOrderIntoDB,
};
