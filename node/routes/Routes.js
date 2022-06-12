import express from 'express'; 
import { createOrder, deleteOrder, getAllOrders, getOrderByCC, updateOrder } from '../controllers/RectimotorController.js';
const router  = express.Router();

router.get('/', getAllOrders)
router.get('/:cc_persona', getOrderByCC)
router.post('/', createOrder)
router.put('/:id_orden', updateOrder)
router.delete('/:id_orden', deleteOrder)

export default router; 