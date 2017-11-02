'use strict';

let mockedProducts = [
    {
        id: 1, 
        name: 'Supreme T-Shirt', 
        brand: 'Supreme', 
        price: 99.99, 
        options: [ 
            { color: 'blue' }, 
            { size: 'XL' } 
        ],
        reviews: [
            {
                id: 1,
                message: 'awesome t-shirt',
                grade: '5'
            },
            {
                id: 2,
                message: 'size is smaller than it was marked',
                grade: '3'
            }
        ]
    },
    {
        id: 2, 
        name: 'Addidas Shoues', 
        brand: 'Addias', 
        price: 135.99, 
        options: [ 
            { color: 'black' }, 
            { size: '8.5' } 
        ],
        reviews: [
            {
                id: 1,
                message: 'best shoes which I have ever bought',
                grade: '5'
            }
        ]
    },
    {
        id: 3, 
        name: 'Asics Running Shoes', 
        brand: 'Asics', 
        price: 89.99, 
        options: [ 
            { color: 'blue' }, 
            { size: '7.5' } 
        ],
        reviews: [
            {
                id: 1,
                message: 'awesome soft shoes',
                grade: '5'
            }
        ]
    },
];

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