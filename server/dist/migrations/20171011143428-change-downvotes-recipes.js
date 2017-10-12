'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Recipes', 'downvotes');
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.addColumn('Recipes', 'downvotes', {
            type: Sequelize.INTEGER,
            allowull: false,
            defaultValue: 0
        });
    }
};