import User from '../models/user';

const user = new User();

export default class UsersController {
    getAll(req, res) {
        res.json(user.getAll());
        console.log('dasdadsdd');
        console.log('adsadsd')
        var a = 1;
        
    }
}