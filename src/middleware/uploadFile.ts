import multer from 'multer';
import path from 'path';

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
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const alowedFileTypes = ['.doc', '.docx', '.pdf'];
    const fileType = path.extname(file.originalname);

    if (alowedFileTypes.includes(fileType)) cb(null, true);
    else return cb(new Error('Invalid file type.'));
  },
};

const upload = multer(multerConfig);

const uploadFile = upload.single('file');

function uploadOrThowErro(req, res, next) {
  uploadFile(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    next();
  });
}

export default uploadOrThowErro;
