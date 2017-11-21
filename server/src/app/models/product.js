'use strict';

import mongoose from 'mongoose';

const productShema = new mongoose.Schema({
    name: String, 
    brand: String, 
    price: Number, 
    options: [ 
        { color: String }, 
        { size: String } 
    ],
    reviews: [
        {
            id: Number,
            message: String,
            grade: String
        }
    ]
});

export default mongoose.model('Product', productShema);