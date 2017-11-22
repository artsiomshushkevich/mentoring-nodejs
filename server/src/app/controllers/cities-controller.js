'use strict';

import City from '../models/city';

export default class CitiesController {
    async getAll(req, res) {
        const cities = await City.find({});
        res.json(cities);
    }

    async removeOne(req, res) {
        const cityId = req.params.id;
        const result = await City.remove({_id: cityId});
        res.json({message: 'city successfully deleted'});
    }
    
    async addOne(req, res) {
        const newCity = {
            name: req.body.name,
            country: req.body.country,
            capital: req.body.capital,
            location: {
                lat: req.body.lat,
                long: req.body.long
            }
        };

        try {
            var newCityModel = new City(newCity);
            const result = await newCityModel.save();
    
            res.json({message: 'city successfully saved'});
        } catch(err) {
            res.status(500).json(err);
        }
        
    }

    async updateOne(req, res) {
        const updatedCityId = req.params.id;
        const updatedCity = {
            name: req.body.name,
            country: req.body.country,
            capital: req.body.capital,
            location: {
                lat: req.body.lat,
                long: req.body.long
            }
        };

        try {
            const result = await City.findByIdAndUpdate(updatedCityId, updatedCity, {new: true});
            
            res.json({message: 'city successfully updated'});
        } catch(err) {
            res.status(500).json(err);
        }
    }
}