import express from 'express';
import { getCurrentIdReplacement, getAllNewReplacements, getNewReplacementsNameById, getNewReplacementsById, updateNewReplacement, createNewReplacement } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/count/', getCurrentIdReplacement)
router.get('/', getAllNewReplacements)
router.get('/:id_repuesto', getNewReplacementsById)
router.get('/name/:replacement_name', getNewReplacementsNameById)
router.put('/edit/:id_repuesto', updateNewReplacement)
router.post('/', createNewReplacement)

export default router; 