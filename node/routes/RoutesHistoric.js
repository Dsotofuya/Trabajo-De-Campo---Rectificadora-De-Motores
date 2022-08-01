import express from 'express';
import { getAllHistorics, getHistoricsIdOrder, updateHistorics, createHistorics } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAllHistorics)
router.get('/:id_orden', getHistoricsIdOrder)
router.put('/edit/:id_orden', updateHistorics)
router.post('/', createHistorics)

export default router; 