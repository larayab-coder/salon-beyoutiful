import express from 'express';
import {
  getAllTechnicians,
  getTechniciansBySpecialty,
  getTechnicianDetails,
} from '../controllers/technicianController.js';

const router = express.Router();

router.get('/', getAllTechnicians);
router.get('/specialty/:specialty', getTechniciansBySpecialty);
router.get('/:technicianId', getTechnicianDetails);

export default router;
