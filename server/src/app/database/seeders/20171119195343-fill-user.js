'use strict';

const mockedProducts = require('../../mocks/users');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', mockedProducts, {});
   
  },

  down: (queryInterface, Sequelize) => {  
    return queryInterface.bulkDelete('Users', null, {});
  }
};
