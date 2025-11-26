const dotenv = require('dotenv');

/** @type {Record<string, import('knex').Knex.Config>} */
dotenv.config();

const shared = {
  client: 'pg',
  migrations: {
    directory: './src/db/migrations',
    extension: 'js', // migrations use .js extension
  },
  seeds: {
    directory: './src/db/seeds',
    extension: 'js',
  },
};

const config = {
  development: {
    ...shared,
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'frosthaven_dev',
    },
  },
  test: {
    ...shared,
    connection: process.env.TEST_DATABASE_URL || {
      host: process.env.TEST_DB_HOST || 'localhost',
      port: Number(process.env.TEST_DB_PORT) || 5432,
      user: process.env.TEST_DB_USER || 'postgres',
      password: process.env.TEST_DB_PASSWORD || 'postgres',
      database: process.env.TEST_DB_NAME || 'frosthaven_test',
    },
  },
  production: {
    ...shared,
    connection: process.env.DATABASE_URL,
  },
};

module.exports = config;
