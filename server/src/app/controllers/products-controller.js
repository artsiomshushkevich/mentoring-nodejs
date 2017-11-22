'use strict';

import Product from '../models/product';

export default class ProductsController {
    async getAll(req, res) {
        const products = await Product.find({});
        res.json(products);
    }

    async getById(req, res) {
        const productId = req.params.id;
        const product = await Product.find({_id: productId});
        res.json(product);
    }

    async getRiviewsByProductId(req, res) {
        const productId = req.params.id;
        const product = await Product.findOne({_id: productId});
        res.json(product.reviews);
    }

    async addOne(req, res, next) {
        const newProduct = {
            name: req.body.name, 
            brand: req.body.brand, 
            price: req.body.price, 
            options: [ 
                { color: req.body.color }, 
                { size: req.body.size } 
            ],
            reviews: []
        };

        try {
            var newProductModel = new Product(newProduct);
            const result = await newProductModel.save();
            
            req.updatedModel = Product;
            req.documentId = result.id;

            next();
            // res.json({message: 'product successfully saved'});
        } catch(err) {
            res.status(500).json(err);
        }
        
    }

    async removeById(req, res) {
        const productId = req.params.id;
        const result = await Product.remove({_id: productId});
        res.json({message: 'product successfully deleted'})
    }
}