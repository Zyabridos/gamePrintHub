const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, "../../", ".env") });

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
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
  test: {
    ...shared,
    connection: process.env.TEST_DATABASE_URL || {
      host: process.env.TEST_DB_HOST || 'localhost',
      port: Number(process.env.TEST_DB_PORT) || 5432,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_NAME,
    },
  },
  production: {
    ...shared,
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};

module.exports = config;
