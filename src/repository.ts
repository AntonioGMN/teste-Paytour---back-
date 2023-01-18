import db from './database.js';

export default async function saveForm(
  nome,
  email,
  escolaridade,
  cargoDesejado,
  observacoes,
  arquivo,
) {
  try {
    if (observacoes !== '') {
      await db.query(
        `INSERT INTO form (nome, email, escolaridade, "cargoDesejado", observacoes, arquivo) 
        VALUES ($1, $2,$3, $4, $5, $6)`,
        [nome, email, escolaridade, cargoDesejado, observacoes, arquivo],
      );
    } else {
      await db.query(
        `INSERT INTO form (nome, email, escolaridade, "cargoDesejado", arquivo) 
        VALUES ($1, $2, $3, $4, $5)`,
        [nome, email, escolaridade, cargoDesejado, arquivo],
      );
    }
    return;
  } catch (err) {
    return err.message;
  }
}
