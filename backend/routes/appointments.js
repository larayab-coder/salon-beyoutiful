import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Todas las rutas requieren autenticación

router.post('/', createAppointment);
router.get('/my-appointments', getMyAppointments);
router.put('/:appointmentId/cancel', cancelAppointment);

export default router;
