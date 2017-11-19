'use strict';

import {Product} from '../database/models/';

export default class ProductsController {
    async getAll(req, res) {
        const products = await Product.findAll();
        res.json(products);
    }

    async getById(req, res) {
        const product = await Product.findById(+req.params.id);
        res.json(product);
    }

    async getRiviewsByProductId(req, res) {
        const product = await Product.findById(+req.params.id);
        const reviews = JSON.parse(product.reviews);
        res.json(reviews);
    }

    async addOne(req, res) {
        const productFromRequest = {
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price
        };

        const addedProduct = await Product.create(productFromRequest);
        res.json(addedProduct);
    }
}