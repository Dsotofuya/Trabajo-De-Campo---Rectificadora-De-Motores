import express from 'express';
import { getAllPersons, getPersonById, updatePerson,createPerson} from '../controllers/RectimotorController.js';
const router = express.Router();

router.get('/', getAllPersons)
router.get('/:cc_persona', getPersonById)
router.put('/edit/:cc_persona', updatePerson)
router.post('/', createPerson)

export default router; 