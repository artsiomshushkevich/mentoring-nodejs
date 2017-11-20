'use strict';

const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/mentoring_cities';
const randomDataServer = http.createServer();

let CityMongooseModel = null;

function _getRandomItemFromArray(array) {
    if (array.length === 0) {
        return 0;
    }

    const randomIndexAccordingArrayLength = Math.floor(Math.random() * array.length);
    return array[randomIndexAccordingArrayLength];
}

function _sendErrorMessage(res) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'something wrong happened'}));
}

function getRandomCityViaNativeDriver(req, res) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) {
            _sendErrorMessage(res)
            return;
        }
        
        const citiesCollection = db.collection('cities');

        citiesCollection.find({}).toArray((err, docs) => {
            db.close();

            if (err) {
                _sendErrorMessage(res);
                return
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(_getRandomItemFromArray(docs)));
        });
    });
}

function getRandomCityViaMongoose(req, res) {
    mongoose.connect(dbUrl, (err) => {
        if (err) {
            _sendErrorMessage(res);
            return;
        }

        if (!CityMongooseModel) {
            CityMongooseModel = mongoose.model('City', new mongoose.Schema({
                name: String,
                country: String,
                capital: Boolean,
                location: {
                    lat: Number,
                    long: Number
                }
            }, { 
                collection : 'cities' 
            }));    
        }
        
        CityMongooseModel.find({}).exec((err, docs) => {
            mongoose.connection.close()
            
            if (err) {
                _sendErrorMessage(res);
                return
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(_getRandomItemFromArray(docs)));
        });
    });
}

randomDataServer.on('request', (req, res) => {
    switch (req.url) {
        case '/random-native':
            getRandomCityViaNativeDriver(req, res);
            break;
        case '/random-mongoose': 
            getRandomCityViaMongoose(req, res);
            break;
        default:
            getRandomCityViaNativeDriver(req, res);
    }
});

randomDataServer.listen(3000, () => console.log('app started'));