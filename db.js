const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Johnny#2003',
  host: 'localhost',
  port: 5433,
  database: 'hh',
});

module.exports = pool;

