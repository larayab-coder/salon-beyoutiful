import express from 'express';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import { getAvailableSlots } from '../services/availabilityService.js';

const router = express.Router();

// Obtener slots disponibles para una técnica en una fecha
router.get('/:technicianId/:date', async (req, res, next) => {
  try {
    const { technicianId, date } = req.params;

    // Obtener técnica
    const technician = await User.findById(technicianId);
    if (!technician || technician.role !== 'tecnica') {
      return res.status(404).json({
        success: false,
        message: 'Técnica no encontrada',
      });
    }

    // Obtener citas de la técnica
    const appointments = await Appointment.find({
      technician: technicianId,
    }).populate('service', 'duration');

    // Calcular slots disponibles
    const availableSlots = getAvailableSlots(date, technician, appointments);

    res.status(200).json({
      success: true,
      availableSlots,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
