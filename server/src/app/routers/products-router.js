import express from 'express';
import ProductsController from '../controllers/products-controller';

const router = express.Router();
const productsController = new ProductsController(); 

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.get('/:id/reviews', productsController.getRiviewsByProductId);
router.post('/', productsController.addOne);

export default router;