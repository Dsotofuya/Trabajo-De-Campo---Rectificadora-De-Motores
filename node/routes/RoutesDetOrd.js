import express from 'express';
import { getAllDetails, getAllDetailsParts, getAllDetailsReplacements, getAllDetailsWorks, updateDetOrd, createDetOrd, getDetOrdId} from '../controllers/RectimotorController.js';
const router = express.Router();

//router.get('/:id_ord', getAllDetails)
router.get('/count/', getDetOrdId)
router.get('/parts/:id_ord', getAllDetailsParts)
router.get('/replacements/:id_ord', getAllDetailsReplacements)
router.get('/works/:id_ord', getAllDetailsWorks)
router.put('/edit/:id_ord', updateDetOrd)
router.post('/', createDetOrd)


export default router;  