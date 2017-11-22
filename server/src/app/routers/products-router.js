'use strict';

import express from 'express';
import ProductsController from '../controllers/products-controller';
import checkToken from '../middlewares/custom-token-check';
import setLastModifiedDate from '../middlewares/set-last-modified-date';

const productsRouter = express.Router();
const productsController = new ProductsController(); 

productsRouter.use(checkToken);

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.get('/:id/reviews', productsController.getRiviewsByProductId);
productsRouter.post('/', productsController.addOne, setLastModifiedDate);

export default productsRouter;