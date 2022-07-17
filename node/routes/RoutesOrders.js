import express from 'express';
import { createOrder, deleteOrder, getAllHistorics, getAllOrders, getAllOrdersDetails, getAllReportsDetails, getReportsDetailsById, getAllMedidas, getAllMotors, getOrderByCC, updateOrder, getAllNuevoRepuesto,  getAllParts, getAllPersons, getAllReportss, getAllTalleres, getAllTrabajos, getPersonById, updatePerson,createPerson} from '../controllers/RectimotorController.js';
const router = express.Router();

//Rutas De Ordenes
router.get('/', getAllOrders)
router.get('/:cc_persona', getOrderByCC)
router.post('/', createOrder)
router.put('/:id_orden', updateOrder)
router.delete('/:id_orden', deleteOrder)
router.get('/details/:id_orden', getReportsDetailsById)

export default router; 