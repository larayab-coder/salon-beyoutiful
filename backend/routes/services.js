import express from 'express';
import {
  getAllServices,
  getServicesBySpecialty,
  createService,
  updateService,
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/specialty/:specialty', getServicesBySpecialty);

router.post('/', protect, authorize('admin'), createService);
router.put('/:serviceId', protect, authorize('admin'), updateService);

export default router;
