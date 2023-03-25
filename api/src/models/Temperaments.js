const { DataTypes } = require('sequelize');
//I create the Temperament model, which will have the attributes requested on the Readme.

module.exports = (sequelize) => {
  sequelize.define('temperament', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });
};