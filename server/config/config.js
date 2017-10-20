module.exports = {
    development: {
        username: 'admin',
        password: 'password1',
        database: 'MoreRecipes',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: 'admin',
        password: 'password1',
        database: 'MoreRecipes',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: "postgres",
    },
};
