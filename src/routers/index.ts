import { Router } from 'express';
import postCurriculo from '../controllers/curriculosController.js';

const router = Router();

router.post('/curriculo', postCurriculo);

export default router;
