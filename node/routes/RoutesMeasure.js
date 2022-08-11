import express from 'express';
import { getAllMeasures, getMeasuresByIdPart, getMeasuresIdByIdPartNValue, updateMeasures, createMeasures, getCurrentIdMeasure } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/name/:id_parte&:valor_medida', getMeasuresIdByIdPartNValue)
router.get('/count/', getCurrentIdMeasure)
router.get('/', getAllMeasures)
router.get('/:id_parte', getMeasuresByIdPart)
router.put('/edit/:id_medida', updateMeasures)
router.post('/', createMeasures)

export default router; 