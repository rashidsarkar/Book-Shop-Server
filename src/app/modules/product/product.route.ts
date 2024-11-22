import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.post('/', productControllers.createProduct);
router.get('/', productControllers.getAllProduct);
router.get('/:productId', productControllers.getProductByID);
router.put('/:productId', productControllers.updateProductByID);
router.delete('/:productId', productControllers.deleteProductByID);

export const productRoutes = router;
