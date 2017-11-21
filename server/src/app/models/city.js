'use strict';

import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
});   

export default mongoose.model('City', citySchema);