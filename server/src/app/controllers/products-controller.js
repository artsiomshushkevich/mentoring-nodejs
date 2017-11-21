'use strict';

import Product from '../models/product';

const product = new Product();

export default class ProductsController {
    async getAll(req, res) {
        res.json(product.getAll());
    }

    async getById(req, res) {
        res.json(product.getById(+req.params.id));
    }

    async getRiviewsByProductId(req, res) {
        res.json(product.getReviewsByProductId(+req.params.id));
    }

    async addOne(req, res) {
        let addedProduct = product.addOne(req.body);
        res.json(addedProduct);
    }
}