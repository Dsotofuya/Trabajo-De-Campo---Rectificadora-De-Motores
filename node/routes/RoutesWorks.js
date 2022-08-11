import express from 'express';
import { getAllWorks, getWorkById, getWorkIdByName, updateWork, createWork, getCurrentIdWork } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/count/', getCurrentIdWork)
router.get('/', getAllWorks)
router.get('/:id_trabajo', getWorkById)
router.get('/name/:work_name', getWorkIdByName)
router.put('/edit/:id_trabajo', updateWork)
router.post('/', createWork)

export default router; 