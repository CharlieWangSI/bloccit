'use strict';
module.exports = (sequelize, DataTypes) => {
  const flair = sequelize.define('Flair', {
    name: {
       type: DataTypes.STRING,
       allowNull: false
     },
     color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      topicId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     postId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     flairId: {
       type: DataTypes.INTEGER,
       allowNull: false
     }
  }, {});
  flair.associate = function(models) {
    // associations can be defined here

    Flair.belongsTo(models.Post, {
       foreignKey: "postId",
       onDelete: "CASCADE"
     });
  };
  return flair;
};
