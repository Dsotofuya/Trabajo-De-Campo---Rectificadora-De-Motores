import express from 'express';
import { getAuthuser, updateUser, createUser, getAlluser, deleteUser } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAlluser)
router.get('/:nombre_usuario', getAuthuser)
router.post('/', createUser)
router.put('/edit/:nombre_usuario', updateUser)
router.delete('/:nombre_usuario', deleteUser)

export default router; 