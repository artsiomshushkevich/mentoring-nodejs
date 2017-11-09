'use strict';

import mockedUsers from '../mocks/users';

export default class User {
    getAll() {
        return mockedUsers;
    }
}