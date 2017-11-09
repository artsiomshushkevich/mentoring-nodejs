import Product from '../models/product';

const product = new Product();

export default class ProductsController {
    getAll(req, res) {
        res.json(product.getAll());
        console.log('asdad')

        console.log('asddas')
        console.log('adasd')
    }

    getById(req, res) {
        res.json(product.getById(+req.params.id));
    }

    getRiviewsByProductId(req, res) {
        res.json(product.getReviewsByProductId(+req.params.id));
    }

    addOne(req, res) {
        let addedProduct = product.addOne(req.body);
        res.json(addedProduct);
    }
}