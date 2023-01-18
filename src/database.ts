import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

let config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

const db = new Pool(config);

export default db;
