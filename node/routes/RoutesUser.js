import express from 'express';
import { getAuthuser, updateUser, createUser } from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/:nombre_usuario', getAuthuser)
router.post('/', createUser)
router.put('/edit/:nombre_usuario', updateUser)

export default router; 