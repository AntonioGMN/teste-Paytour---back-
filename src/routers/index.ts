import { Router } from 'express';
import postCurriculo from '../controllers/curriculosController.js';
import uploadOrThowErro from '../middleware/uploadFile.js';

const router = Router();

router.post('/curriculo', uploadOrThowErro, postCurriculo);

export default router;
