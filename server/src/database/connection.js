import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'sapd',
  port: 5432
});

export default {
  query: (text, params) => pool.query(text, params)
};
