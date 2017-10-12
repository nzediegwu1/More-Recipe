module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.removeColumn('Recipes', 'upvotes'),
    down: (queryInterface, Sequelize) => queryInterface.addColumn('Recipes', 'upvotes', {
        type: Sequelize.INTEGER,
        allowull: false,
        defaultValue: 0,
    }),
};
