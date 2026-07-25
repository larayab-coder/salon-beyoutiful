import { useEffect, useState } from 'react';
import { appointmentsAPI } from '../services/api';

const Dashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentsAPI.getMyAppointments('confirmada');
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">¡Bienvenida {user?.name}!</h1>
          <p className="text-gray-600">Aquí puedes gestionar tus citas y reservar nuevas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-pink-500">{appointments.length}</div>
            <p className="text-gray-600 mt-2">Citas Confirmadas</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-purple-500">📅</div>
            <p className="text-gray-600 mt-2">Próxima Cita</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-blue-500">💅</div>
            <p className="text-gray-600 mt-2">Servicios</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Próximas Citas</h2>
          {loading ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt._id} className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-lg text-gray-800">{apt.service.name}</h3>
                  <p className="text-gray-600">Técnica: {apt.technician.name}</p>
                  <p className="text-gray-600">Fecha: {new Date(apt.date).toLocaleDateString('es-ES')}</p>
                  <p className="text-gray-600">Hora: {apt.startTime} - {apt.endTime}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No tienes citas confirmadas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
