module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Reviews'),
};
