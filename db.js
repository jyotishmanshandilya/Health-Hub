import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'Johnny#2003',
  host: 'localhost',
  port: 5433,
  database: 'hh',
});

export default pool;

