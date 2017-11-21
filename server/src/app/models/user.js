'use strict';

// import mockedUsers from '../mocks/users';

import mongoose from 'mongoose';

const userShema = new mongoose.Schema({
    username: String,
    password: String,
    email: Boolean
});

export default mongoose.model('User', userShema);