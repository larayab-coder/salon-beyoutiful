import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Services endpoints
export const servicesAPI = {
  getAllServices: () => api.get('/services'),
  getServicesBySpecialty: (specialty) => api.get(`/services/specialty/${specialty}`),
};

// Technicians endpoints
export const techniciansAPI = {
  getAllTechnicians: () => api.get('/technicians'),
  getTechniciansBySpecialty: (specialty) => api.get(`/technicians/specialty/${specialty}`),
  getTechnicianDetails: (technicianId) => api.get(`/technicians/${technicianId}`),
};

// Appointments endpoints
export const appointmentsAPI = {
  createAppointment: (data) => api.post('/appointments', data),
  getMyAppointments: (status) => api.get(`/appointments/my-appointments?status=${status || ''}`),
  cancelAppointment: (appointmentId) => api.put(`/appointments/${appointmentId}/cancel`),
};

export default api;
