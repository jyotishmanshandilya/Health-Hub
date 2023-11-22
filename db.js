import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'aditya',
  host: 'localhost',
  port: 5432,
  database: 'hh',
});

export default pool;