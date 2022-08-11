import express from 'express';
import { getAllParts, getPartById, getPartIdByName, updatePart, createPart, getCurrentIdPart } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/count/', getCurrentIdPart)
router.get('/', getAllParts)
router.get('/:id_parte', getPartById)
router.get('/name/:part_name', getPartIdByName)
router.put('/edit/:id_parte', updatePart)
router.post('/', createPart)

export default router; 