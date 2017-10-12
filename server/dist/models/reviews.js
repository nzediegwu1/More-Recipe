'use strict';

module.exports = function (sequelize, DataTypes) {
    var Reviews = sequelize.define('Reviews', {
        UserId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        // add this or fk going to db will be null
        RecipeId: DataTypes.INTEGER
    });
    Reviews.associate = function (models) {
        // associations can be defined here
        Reviews.belongsTo(models.Recipes);
    };
    return Reviews;
};