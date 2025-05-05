const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pascco', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;