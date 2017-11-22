'use strict';

import mongoose from 'mongoose';

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    brand: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    }, 
    options: [ 
        { 
            color: String 
        }, 
        { 
            size: {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
            }
        } 
    ],
    reviews: [{
            message: {
                type: String,
                minlength: 5,
                required: true
            },
            grade: {
                type: String,
                enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                required: true
            }
    }]
},{
    strict: false
});

export default mongoose.model('Product', productShema);