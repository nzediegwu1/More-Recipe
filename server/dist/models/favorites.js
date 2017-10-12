'use strict';

module.exports = function (sequelize, DataTypes) {
    var Favorites = sequelize.define('Favorites', {
        RecipeId: DataTypes.INTEGER,
        // foreignKey
        UserId: DataTypes.INTEGER
    });
    Favorites.associate = function (models) {
        // associations can be defined here
        Favorites.belongsTo(models.Users);
    };
    return Favorites;
};