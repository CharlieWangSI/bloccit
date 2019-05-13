'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
     type: DataTypes.INTEGER,
     onDelete: "CASCADE",
     references: {
       model: "Topic",
       key: "id",
       as: "topicId",
     }
   },
   advsId: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "Advs",
      key: "id",
      as: "advsId",
    }
  }

  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.Topic, {
       foreignKey: "topicId",
       onDelete: "CASCADE",
    }),
    Banner.belongsTo(models.Advs, {
       foreignKey: "advsId",
       onDelete: "CASCADE",
     })
  };
  return Banner;
};
