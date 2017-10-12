'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('Favorites', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            RecipeId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'UserId'
                }
            }
        });
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Favorites');
    }
};