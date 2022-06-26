import express from 'express';
import { createOrder, deleteOrder, getAllHistorics, getAllOrders, getAllOrdersDetails, getAllReportsDetails, getAllMedidas, getAllMotors, getOrderByCC, updateOrder, getAllNuevoRepuesto,  getAllParts, getAllPersons, getAllReportss, getAllTalleres, getAllTrabajos} from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAllOrders)
router.get('/:cc_persona', getOrderByCC)
router.post('/', createOrder)
router.put('/:id_orden', updateOrder)
router.delete('/:id_orden', deleteOrder)

//router.get('/', getAllOrdersDetails)
//router.get('/', getAllReportsDetails)
//router.get('/', getAllHistorics)
//router.get('/', getAllMedidas)
//router.get('/', getAllMotors)
//router.get('/', getAllNuevoRepuesto)
//router.get('/', getAllParts)
//router.get('/', getAllPersons)
//router.get('/', getAllReportss)
//router.get('/', getAllTalleres)
//router.get('/', getAllTrabajos)
export default router; 