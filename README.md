# 💅 Salon Beyoutiful - Sistema de Citas

Sistema completo de reserva de citas para salón de uñas con autenticación JWT, notificaciones en tiempo real y gestión de disponibilidad.

## 📋 Características

- ✅ Registro e inicio de sesión de clientes con autenticación JWT
- ✅ Visualización de citas disponibles por técnica y servicio
- ✅ Reserva de citas con confirmación inmediata
- ✅ Notificaciones por email a cliente y técnica
- ✅ Gestión de citas (ver historial, cancelar)
- ✅ Panel de administración para técnicas
- ✅ Validación de disponibilidad en tiempo real
- ✅ Horario: Lunes a Viernes, 10 AM - 7 PM

## 🏗️ Stack Tecnológico

**Backend:**
- Node.js + Express
- MongoDB
- JWT (Autenticación)
- Nodemailer (Email)
- Firebase Cloud Messaging (Push notifications)

**Frontend:**
- React + Vite
- React Router
- Axios
- Tailwind CSS
- Date-fns

## 📦 Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configura tus variables de entorno
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🔐 Variables de Entorno

Consulta `.env.example` en cada directorio para configurar:
- MongoDB URI
- JWT Secret
- Email credentials
- Firebase config
- API URLs

## 📁 Estructura del Proyecto

```
salon-beyoutiful/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🚀 Deploy

Próximamente: Instrucciones para deploy en Hetzner

## 📝 Licencia

MIT
