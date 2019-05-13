'use strict';
module.exports = (sequelize, DataTypes) => {
  const advs = sequelize.define('advs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  advs.associate = function(models) {
    // associations can be defined here
    Advs.hasMany(models.Banner, {
     foreignKey: "advsId",
     as: "banners",
   });
  };
  return advs;
};
