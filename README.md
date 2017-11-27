# mentoring-nodejs
Bunch of tasks for Node.js mentoring program

## How to run the app:

1. Clone [this repository](https://github.com/artsiomshushkevich/mentoring-nodejs.git)
2. Go to `server/` directory
3. Run `npm install`
4. Run `mongod` on your local CLI (mongodb have te be installed globally)
5. Run `mongoimport --jsonArray --db mentoring_cities --collection cities --drop --file ./src/app/mocks/cities.json`
6. Run `mongoimport --jsonArray --db mentoring_database --collection products --drop --file ./src/app/mocks/products.json`
7. Run `mongoimport --jsonArray --db mentoring_database --collection users --drop --file ./src/app/mocks/users.json`
8. Run `mongoimport --jsonArray --db mentoring_database --collection cities --drop --file ./src/app/mocks/cities.json`
9. For running server with random cities data go to `http-servers/` directrory and run `node random-data-server.js`
9. For running app go back to `server/` directory and run `npm start`
5. Enjoy:)
