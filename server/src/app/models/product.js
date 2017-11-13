'use strict';

import mockedProducts from '../mocks/products';

export default class Product {
    getAll() {
        return mockedProducts;
    }

    getById(id) {
        let desiredProduct = null;
    
        for (let i = 0; i < mockedProducts.length; i++){
            if (mockedProducts[i].id === id) {
                desiredProduct = mockedProducts[i];
                break;
            }
        }
     
        return desiredProduct;
    }

    getReviewsByProductId(id) {
        const product = this.getById(id);
        return product ? product.reviews : null;
    }

    addOne(productObj) {
        mockedProducts.push(productObj);
        return productObj;
    }
}