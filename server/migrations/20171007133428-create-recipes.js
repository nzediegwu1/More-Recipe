module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        ingredients: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Recipes'),
};
