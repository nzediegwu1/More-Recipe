module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
        UserId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        // add this or fk going to db will be null
        RecipeId: DataTypes.INTEGER,
    });
    Reviews.associate = (models) => {
        // associations can be defined here
        Reviews.belongsTo(models.Recipes);
    };
    return Reviews;
};
