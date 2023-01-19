import db from '../src/database.js';

async function createTable() {
  try {
    await db.query(`CREATE TABLE Form (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      "cargoDesejado" TEXT NOT NULL,
      escolaridade TEXT NOT NULL,
      observacoes TEXT NULL,
      arquivo TEXT NOT NULL,
		  "dataCriacao" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    );`);

    console.log('Table Criada');
  } catch (err) {
    console.log(err);
  }

  await db.end();
}

createTable();
