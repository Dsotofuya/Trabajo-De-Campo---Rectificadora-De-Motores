import express from 'express';
import { getAllEngines, getEngineById, updateEngine, createEngine} from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAllEngines)
router.get('/:id_motor', getEngineById)
router.put('/edit/:id_motor', updateEngine)
router.post('/', createEngine)

export default router; 