import { Request, Response } from 'express';
import saveForm from '../repository.js';

async function postCurriculo(req: Request, res: Response) {
  const { nome, email, escolaridade, cargoDesejado, observacoes } = req.body;
  const arquivo = req.file.filename;

  console.log({
    nome,
    email,
    escolaridade,
    cargoDesejado,
    observacoes,
    arquivo,
  });

  const response = await saveForm(
    nome,
    email,
    escolaridade,
    cargoDesejado,
    observacoes,
    arquivo,
  );
  console.log(response);

  res.status(200).send('chicos');
}

export default postCurriculo;
