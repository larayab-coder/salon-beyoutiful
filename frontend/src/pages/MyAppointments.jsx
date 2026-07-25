import { useEffect, useState } from 'react';
import { appointmentsAPI } from '../services/api';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentsAPI.getMyAppointments();
        setAppointments(response.data.appointments);
      } catch (err) {
        setError('Error cargando citas');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (window.confirm('¿Estás segura de que deseas cancelar esta cita?')) {
      try {
        await appointmentsAPI.cancelAppointment(appointmentId);
        setAppointments(appointments.filter((apt) => apt._id !== appointmentId));
      } catch (err) {
        setError('Error al cancelar la cita');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">Mis Citas</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Cargando citas...</p>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt._id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{apt.service.name}</h2>
                    <p className="text-gray-600">Técnica: <strong>{apt.technician.name}</strong></p>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Fecha</p>
                    <p className="font-semibold">{new Date(apt.date).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Hora</p>
                    <p className="font-semibold">{apt.startTime} - {apt.endTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Duración</p>
                    <p className="font-semibold">{apt.service.duration} minutos</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Precio</p>
                    <p className="font-semibold text-pink-600">${apt.service.price}</p>
                  </div>
                </div>

                {apt.status === 'confirmada' && (
                  <button
                    onClick={() => handleCancel(apt._id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Cancelar Cita
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-500 text-lg mb-4">No tienes citas</p>
            <a href="/book-appointment" className="text-pink-500 font-semibold hover:underline">
              Reserva una cita ahora
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
