module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.removeColumn('Recipes', 'downvotes'),
    down: (queryInterface, Sequelize) => queryInterface.addColumn('Recipes', 'downvotes', {
        type: Sequelize.INTEGER,
        allowull: false,
        defaultValue: 0,
    }),
};
