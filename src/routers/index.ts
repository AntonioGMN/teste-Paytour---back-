import { Router } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'curriculos');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + file.originalname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post('/curriculo', upload.single('file'), (req, res) => {
  console.log(req.file);
  console.log(req.body);

  res.send(req.body);
});

export default router;
