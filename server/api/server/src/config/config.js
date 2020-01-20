require('dotenv').config();

module.exports = {
  development: {
    database: 'book',
    username: 'postgres',
    password: null,
    host: 'book_server_pg.book-test-net',
    port: '5432',
    dialect: 'postgres'
  },

  test: {
    database: 'book',
    username: 'postgres',
    password: null,
    host: 'book_server_pg.book-test-net',
    port: '5432',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: '5433',
    dialect: 'postgres'
  }
}
