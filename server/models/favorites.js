module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define('Favorites', {
        RecipeId: DataTypes.INTEGER,
        // foreignKey
        UserId: DataTypes.INTEGER,
    });
    Favorites.associate = (models) => {
        // associations can be defined here
        Favorites.belongsTo(models.Users);
    };
    return Favorites;
};
