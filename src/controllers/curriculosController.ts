import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

export default function postCurriculo(req: Request, res: Response) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'curriculos');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname + '-' + Date.now() + path.extname(file.originalname),
      );
    },
  });

  const multerConfig = {
    storage: storage,
    onError: function (err, next) {
      console.log('error', err);
      next(err);
    },
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const alowedFileTypes = ['.doc', '.docx', '.pdf'];
      const fileType = path.extname(file.originalname);

      if (alowedFileTypes.includes(fileType)) cb(null, true);
      else return cb(new Error('Invalid file type.'));
    },
  };

  const upload = multer(multerConfig);
  const uploadOrThowErro = upload.single('file');

  uploadOrThowErro(req, res, function (err) {
    if (err) {
      return res.status(400).send(err);
    }

    const file = req.file;
    res.status(200).send({
      filename: file.filename,
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size,
      fieldname: file.fieldname,
    });
  });
}
