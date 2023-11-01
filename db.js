const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'aditya',
  host: 'localhost',
  port: 5432,
  database: 'hh',
});

module.exports = pool;

