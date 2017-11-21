'use strict';

import City from '../models/city';

export default class CitiesController {
    async getAll(req, res) {
        const cities = await City.find({});
        res.json(cities);
    }
}