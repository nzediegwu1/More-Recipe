module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Favorites', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        RecipeId: {
            type: Sequelize.INTEGER,
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
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
                as: 'UserId',
            },
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Favorites'),
};
