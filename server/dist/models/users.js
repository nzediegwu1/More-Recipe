'use strict';

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        username: DataTypes.STRING,
        fullname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    Users.associate = function (models) {
        // associations can be defined here
        Users.hasMany(models.Recipes);
    };
    return Users;
};