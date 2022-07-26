import express from 'express';
import { getAllMeasures, getMeasuresByIdPart, getMeasuresIdByName, updateMeasures, createMeasures } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAllMeasures)
router.get('/:id_parte', getMeasuresByIdPart)
router.get('/name/:measure_name', getMeasuresIdByName)
router.put('/edit/:id_medida', updateMeasures)
router.post('/', createMeasures)

export default router; 