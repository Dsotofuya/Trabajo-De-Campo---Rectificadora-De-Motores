import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderId, getReportsDetailsById, getOrderByCC, updateOrder } from '../controllers/RectimotorController.js';
const router = express.Router();

//Rutas De Ordenes
router.get('/', getAllOrders)
router.get('/count', getOrderId)
router.get('/:cc_persona', getOrderByCC)

router.post('/', createOrder)
router.put('/:id_orden', updateOrder)
router.delete('/:id_orden', deleteOrder)
router.get('/details/:id_orden', getReportsDetailsById)

export default router; 