import transporter from '../config/email.js';

const sendAppointmentConfirmation = async (clientEmail, clientName, appointmentDetails) => {
  const { technician, service, date, startTime, endTime } = appointmentDetails;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: clientEmail,
    subject: `✅ Cita Confirmada - ${process.env.SALON_NAME}`,
    html: `
      <h2>¡Hola ${clientName}!</h2>
      <p>Tu cita ha sido confirmada exitosamente.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Detalles de tu cita:</h3>
        <p><strong>Servicio:</strong> ${service.name}</p>
        <p><strong>Técnica:</strong> ${technician.name}</p>
        <p><strong>Fecha:</strong> ${new Date(date).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</p>
        <p><strong>Hora:</strong> ${startTime} - ${endTime}</p>
        <p><strong>Precio:</strong> $${service.price}</p>
      </div>

      <p>Si necesitas cancelar o reprogramar, contáctanos con 24 horas de anticipación.</p>
      
      <p>📞 ${process.env.SALON_PHONE}</p>
      <p>📧 ${process.env.SALON_EMAIL}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de confirmación enviado a ${clientEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return false;
  }
};

const sendAppointmentToTechnician = async (technicianEmail, technicianName, appointmentDetails) => {
  const { client, service, date, startTime, endTime } = appointmentDetails;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: technicianEmail,
    subject: `📅 Nueva Cita Asignada - ${process.env.SALON_NAME}`,
    html: `
      <h2>¡Hola ${technicianName}!</h2>
      <p>Tienes una nueva cita asignada.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Detalles de la cita:</h3>
        <p><strong>Cliente:</strong> ${client.name}</p>
        <p><strong>Teléfono:</strong> ${client.phone}</p>
        <p><strong>Servicio:</strong> ${service.name}</p>
        <p><strong>Fecha:</strong> ${new Date(date).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</p>
        <p><strong>Hora:</strong> ${startTime} - ${endTime}</p>
      </div>

      <p>Por favor, confirma que puedas atender esta cita.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de cita enviado a ${technicianEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return false;
  }
};

const sendCancellationEmail = async (email, name, appointmentDetails) => {
  const { service, date, startTime } = appointmentDetails;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `❌ Cita Cancelada - ${process.env.SALON_NAME}`,
    html: `
      <h2>Cita Cancelada</h2>
      <p>Hola ${name},</p>
      
      <p>Tu cita ha sido cancelada:</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Servicio:</strong> ${service.name}</p>
        <p><strong>Fecha:</strong> ${new Date(date).toLocaleDateString('es-ES')}</p>
        <p><strong>Hora:</strong> ${startTime}</p>
      </div>

      <p>Si deseas agendar una nueva cita, contáctanos.</p>
      <p>📞 ${process.env.SALON_PHONE}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de cancelación enviado a ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return false;
  }
};

export default {
  sendAppointmentConfirmation,
  sendAppointmentToTechnician,
  sendCancellationEmail,
};
