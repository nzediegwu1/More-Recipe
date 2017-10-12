'use strict';

module.exports = function (sequelize, DataTypes) {
    var Recipes = sequelize.define('Recipes', {
        title: DataTypes.STRING,
        ingredients: DataTypes.STRING,
        description: DataTypes.TEXT,
        upvotes: DataTypes.INTEGER,
        downvotes: DataTypes.INTEGER,
        // add this or fk going to db will be null
        UserId: DataTypes.INTEGER
    });
    Recipes.associate = function (models) {
        // associations can be defined here
        Recipes.belongsTo(models.Users);
        Recipes.hasMany(models.Reviews);
    };
    return Recipes;
};