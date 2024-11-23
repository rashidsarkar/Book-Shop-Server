import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from book!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: { message: 'Route not found' },
    stack: null,
  });
});

export default app;
