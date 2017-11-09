import express from 'express';
import ProductsController from '../controllers/products-controller';
import checkToken from '../middlewares/custom-token-check';

const productsRouter = express.Router();
const productsController = new ProductsController(); 

productsRouter.use(checkToken);

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.get('/:id/reviews', productsController.getRiviewsByProductId);
productsRouter.post('/', productsController.addOne);

export default productsRouter;