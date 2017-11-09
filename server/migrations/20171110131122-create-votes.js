module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        UserId: {
            type: Sequelize.INTEGER,
        },
        upvotes: {
            type: Sequelize.INTEGER,
        },
        downvotes: {
            type: Sequelize.INTEGER,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        RecipeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Recipes',
                key: 'id',
                as: 'RecipeId',
            },
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Votes'),
};
