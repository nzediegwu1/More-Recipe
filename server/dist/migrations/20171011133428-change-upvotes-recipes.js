'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Recipes', 'upvotes');
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.addColumn('Recipes', 'upvotes', {
            type: Sequelize.INTEGER,
            allowull: false,
            defaultValue: 0
        });
    }
};