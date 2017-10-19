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
            allowNull: false,
        },
        ingredients: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        upvotes: {
            type: Sequelize.INTEGER,
            allowull: false,
            defaultValue: 0,
        },
        downvotes: {
            type: Sequelize.INTEGER,
            allowull: false,
            defaultValue: 0,
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
