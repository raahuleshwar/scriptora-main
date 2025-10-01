import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Pill, 
  FileText, 
  Plus,
  CheckCircle,
  AlertCircle,
  X,
  Phone,
  MapPin
} from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      date: '2024-01-20',
      time: '10:00 AM',
      doctor: 'Dr. Smith',
      specialty: 'Cardiology',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 201',
      phone: '+1-234-567-8901',
    },
    {
      id: 2,
      date: '2024-01-25',
      time: '2:30 PM',
      doctor: 'Dr. Johnson',
      specialty: 'General Medicine',
      type: 'Consultation',
      status: 'pending',
      location: 'Room 105',
      phone: '+1-234-567-8902',
    },
  ]);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: '2024-01-15',
      doctor: 'Dr. Smith',
      diagnosis: 'Hypertension',
      medicines: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '30 days' },
      ],
      instructions: 'Take with food. Monitor blood pressure daily.',
    },
    {
      id: 2,
      date: '2024-01-10',
      doctor: 'Dr. Johnson',
      diagnosis: 'Common Cold',
      medicines: [
        { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5 days' },
      ],
      instructions: 'Rest and drink plenty of fluids.',
    },
  ]);

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', fee: '$150' },
    { id: 2, name: 'Dr. Johnson', specialty: 'General Medicine', fee: '$100' },
    { id: 3, name: 'Dr. Brown', specialty: 'Dermatology', fee: '$120' },
    { id: 4, name: 'Dr. Wilson', specialty: 'Orthopedics', fee: '$180' },
  ];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      const doctor = doctors.find(d => d.id.toString() === selectedDoctor);
      
      // Check for time conflicts
      const conflictExists = upcomingAppointments.some(apt => 
        apt.date === selectedDate && apt.time === selectedTime
      );
      
      if (conflictExists) {
        alert('This time slot is already booked. Please select another time.');
        return;
      }
      
      const newAppointment = {
        id: upcomingAppointments.length + 1,
        date: selectedDate,
        time: selectedTime,
        doctor: doctor?.name || '',
        specialty: doctor?.specialty || '',
        type: appointmentType,
        status: 'pending',
        location: 'TBD',
        phone: '+1-234-567-8900',
      };
      
      setUpcomingAppointments([...upcomingAppointments, newAppointment]);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedDoctor('');
      setAppointmentType('consultation');
      setShowBookingModal(false);
      alert(`Appointment booked successfully with ${doctor?.name} on ${selectedDate} at ${selectedTime}`);
    }
  };

  const handleCancelAppointment = (appointmentId: number) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setUpcomingAppointments(appointments => 
        appointments.filter(appointment => appointment.id !== appointmentId)
      );
      alert('Appointment cancelled successfully');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medical Records</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Book Appointment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Book New Appointment
            </h3>
          </div>
          <div className="p-6">
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </button>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Available Doctors</h4>
              <div className="space-y-2">
                {doctors.slice(0, 3).map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{doctor.fee}</p>
                      <p className="text-xs text-green-600">Available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Appointments
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {appointment.date} at {appointment.time}
                        </span>
                        {appointment.status === 'confirmed' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-gray-900 font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {appointment.location}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {appointment.phone}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Prescriptions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Pill className="w-5 h-5 mr-2" />
            Recent Prescriptions
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">Prescribed by {prescription.doctor}</p>
                    <p className="text-sm text-gray-500">{prescription.date}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Diagnosis:</span> {prescription.diagnosis}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-2 mb-3">
                  {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="bg-gray-50 rounded p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">
                            {medicine.dosage} - {medicine.frequency}
                          </p>
                          <p className="text-xs text-gray-500">Duration: {medicine.duration}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {prescription.instructions && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Instructions:</span> {prescription.instructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Book Appointment</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty} ({doctor.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Type
                </label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="checkup">Routine Checkup</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots for {selectedDate}
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        disabled={upcomingAppointments.some(apt => apt.date === selectedDate && apt.time === slot)}
                        className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                          selectedTime === slot
                            ? 'bg-blue-500 text-white border-blue-500'
                            : upcomingAppointments.some(apt => apt.date === selectedDate && apt.time === slot)
                            ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {slot} {upcomingAppointments.some(apt => apt.date === selectedDate && apt.time === slot) && '(Booked)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime || !selectedDoctor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;