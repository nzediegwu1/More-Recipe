module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: DataTypes.STRING,
        fullname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    Users.associate = (models) => {
        // associations can be defined here
        Users.hasMany(models.Recipes);
    };
    return Users;
};
