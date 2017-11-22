'use strict';

import mongoose from 'mongoose';
import jsValidator from 'validator';

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    capital: {
        type: Boolean,
        required: true,
        validate: {
            validator: value => jsValidator.isBoolean(value),
            message: 'capital value is not boolean'
        }
    },
    location: {
        lat: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        long: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        }
    }
});   

export default mongoose.model('City', citySchema);