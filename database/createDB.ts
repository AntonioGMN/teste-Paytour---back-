import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

let config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
};

const client = new Client(config);

async function createDatabase() {
  try {
    await client.connect();
    await client.query('CREATE DATABASE "CurriculoForm"');
    console.log('DataBase CurriloForm criada');
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end();
  }
}

createDatabase();
