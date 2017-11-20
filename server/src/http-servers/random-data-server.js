'use strict';

const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017/mentoring_cities';
const randomDataServer = http.createServer();

function getRandomItemFromArray(array) {
    if (array.length === 0) {
        return 0;
    }

    const randomIndexAccordingArrayLength = Math.floor(Math.random() * array.length);
    return array[randomIndexAccordingArrayLength];
}

randomDataServer.on('request', (req, res) => {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'something wrong happened'}));
            return;
        }
        
        const citiesCollection = db.collection('cities');

        citiesCollection.find({}).toArray((err, docs) => {
            db.close();

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(getRandomItemFromArray(docs)));
        });
      });
});

randomDataServer.listen(3000, () => console.log('app started'));