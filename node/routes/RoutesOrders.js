import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderId, getReportsDetailsById, getReportsDetailsByOrderID, getOrderByCC, updateOrder, getOrderById } from '../controllers/RectimotorController.js';
const router = express.Router();

//Rutas De Ordenes
router.get('/', getAllOrders)
router.get('/count', getOrderId)
router.get('/:cc_persona', getOrderByCC)
router.get('/get/:id_orden', getOrderById)

router.post('/', createOrder)
router.put('/:id_orden', updateOrder)
router.delete('/:id_orden', deleteOrder)
router.get('/details/:id_orden', getReportsDetailsById)
router.get('/detailsUpdate/:id_orden', getReportsDetailsByOrderID)

export default router; 