import express from 'express'; 
import { createOrder, deleteOrder, getAllOrders, getOrderByCC, updateOrder } from '../controllers/RectimotorController.js';
const router  = express.Router();

router.get('/', getAllOrders)
router.get('/:id', getOrderByCC)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router; 