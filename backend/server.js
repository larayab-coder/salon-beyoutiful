import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import serviceRoutes from './routes/services.js';
import technicianRoutes from './routes/technicians.js';
import availabilityRoutes from './routes/availability.js';

dotenv.config();

const app = express();

// Conectar a BD
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/availability', availabilityRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: '✅ API funcionando correctamente' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});
