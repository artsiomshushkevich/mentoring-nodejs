'use strict';

import {Product} from '../database/models/';

export default class ProductsController {
    getAll(req, res) {
        Product.findAll()
            .then(products => res.json(products));
        // res.json(product.getAll());
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