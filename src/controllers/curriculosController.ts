import { Request, Response } from 'express';
import saveForm from '../repository.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function postCurriculo(req: Request, res: Response) {
  const { nome, email, escolaridade, cargoDesejado, observacoes } = req.body;
  const arquivo = req.file.filename;

  try {
    await saveForm(
      nome,
      email,
      escolaridade,
      cargoDesejado,
      observacoes,
      arquivo,
    );

    await sendEmail(nome, email, escolaridade, cargoDesejado, observacoes);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function sendEmail(
  nome,
  email,
  escolaridade,
  cargoDesejado,
  observacoes,
) {
  return new Promise((resolver, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'E-mail enviado usando Node!',
      text: `Seu curricurilo foi recebido com sucesso. A seguir segue os dados que enviou no cadastro:
    nome: ${nome}
    email: ${email}
    escolaridade: ${escolaridade}      
    cargoDesejado: ${cargoDesejado}
    ${observacoes != '' ? `observacoes: ${observacoes}` : ''}
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('reve erro');
        reject(new Error(error.message));
      }
      resolver(true);
    });
  });
}

export default postCurriculo;
