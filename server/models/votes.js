module.exports = (sequelize, DataTypes) => {
    const Votes = sequelize.define('Votes', {
        UserId: DataTypes.INTEGER,
        RecipeId: DataTypes.INTEGER,
        upvotes: DataTypes.INTEGER,
        downvotes: DataTypes.INTEGER,
    });
    Votes.associate = (models) => {
        // associations can be defined here
        Votes.belongsTo(models.Recipes);
    };
    return Votes;
};
