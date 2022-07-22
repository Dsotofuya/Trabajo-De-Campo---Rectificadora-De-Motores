import express from 'express';
import { getAllWorkshops, getWorkshopById, updateWorkshop, createWorkshop, getWorkShopIdByName} from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAllWorkshops)
router.get('/:id_taller', getWorkshopById)
router.get('/name/:workshop_name', getWorkShopIdByName)
router.put('/edit/:id_taller', updateWorkshop)
router.post('/', createWorkshop)

export default router; 