'use strict';

let mockedUsers = [
    {
        id: 1,
        username: 'lol123',
        password: '12345678'
    },
    {
        id: 2,
        username: 'bad_motherfucker2007',
        password: 'qwerty1324'
    }
];

export default class User {
    getAll() {
        return mockedUsers;
    }
}