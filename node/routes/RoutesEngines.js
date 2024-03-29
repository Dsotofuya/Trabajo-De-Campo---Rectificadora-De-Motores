import express from 'express';
import { getAllEngines, getEngineById, updateEngine, createEngine, getEngineIdByName, getCurrentIdEngine}  from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/count/', getCurrentIdEngine)
router.get('/', getAllEngines)
router.get('/:id_motor', getEngineById)
router.get('/name/:motor_name', getEngineIdByName)
router.put('/edit/:id_motor', updateEngine)
router.post('/', createEngine)

export default router; 