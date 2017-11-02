import Product from '../models/product';

const product = new Product();

export default class ProductsController {
    getAll(req, res) {
        res.json(product.getAll());
    }

    getById(req, res) {

    }

    getRiviewsByProductId(req, res) {

    }

    addOne(req, res) {

    }
}