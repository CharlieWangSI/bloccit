'use strict';
module.exports = (sequelize, DataTypes) => {
  const Advs = sequelize.define('Advs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  return Advs;
};
