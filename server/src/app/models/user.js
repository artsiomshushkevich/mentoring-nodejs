'use strict';

import mongoose from 'mongoose';
import jsValidator from 'validator';
const userShema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3, 
        maxlength: 16,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 16,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return jsValidator.isEmail(value);
            },
            message: 'incorrect email format'
        }
    },
    lastModifiedDate: Date
}, {
    strict: false
});

export default mongoose.model('User', userShema);