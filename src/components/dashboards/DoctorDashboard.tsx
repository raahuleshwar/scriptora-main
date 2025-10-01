import React, { useState } from 'react';
import { Calendar, Clock, User, Mic, MicOff, Search, Stethoscope, FileText, Users, Plus, Eye, CreditCard as Edit, X } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [activeTab, setActiveTab] = useState('schedule');
  const [searchPatient, setSearchPatient] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [todaysSchedule, setTodaysSchedule] = useState([
    {
      id: 1,
      time: '09:00 AM',
      patient: 'John Smith',
      age: 45,
      condition: 'Routine Checkup',
      status: 'completed',
      phone: '+1-234-567-8901',
    },
    {
      id: 2,
      time: '09:30 AM',
      patient: 'Emily Johnson',
      age: 32,
      condition: 'Follow-up',
      status: 'current',
      phone: '+1-234-567-8902',
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'Michael Brown',
      age: 28,
      condition: 'Consultation',
      status: 'upcoming',
      phone: '+1-234-567-8903',
    },
    {
      id: 4,
      time: '10:30 AM',
      patient: 'Sarah Wilson',
      age: 55,
      condition: 'Blood Pressure Check',
      status: 'upcoming',
      phone: '+1-234-567-8904',
    },
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      phone: '+1-234-567-8901',
      lastVisit: '2024-01-15',
      diagnosis: 'Hypertension',
      prescription: 'Lisinopril 10mg',
      medicalHistory: ['Hypertension', 'Diabetes Type 2'],
      allergies: ['Penicillin'],
      visits: [
        { date: '2024-01-15', diagnosis: 'Hypertension', prescription: 'Lisinopril 10mg' },
        { date: '2023-12-15', diagnosis: 'Routine Checkup', prescription: 'Multivitamins' },
      ]
    },
    {
      id: 2,
      name: 'Emily Johnson',
      age: 32,
      phone: '+1-234-567-8902',
      lastVisit: '2024-01-10',
      diagnosis: 'Diabetes Type 2',
      prescription: 'Metformin 500mg',
      medicalHistory: ['Diabetes Type 2'],
      allergies: ['None'],
      visits: [
        { date: '2024-01-10', diagnosis: 'Diabetes Type 2', prescription: 'Metformin 500mg' },
        { date: '2023-11-10', diagnosis: 'Diabetes Follow-up', prescription: 'Metformin 500mg' },
      ]
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 28,
      phone: '+1-234-567-8903',
      lastVisit: '2024-01-05',
      diagnosis: 'Common Cold',
      prescription: 'Rest and fluids',
      medicalHistory: ['Asthma'],
      allergies: ['Dust'],
      visits: [
        { date: '2024-01-05', diagnosis: 'Common Cold', prescription: 'Rest and fluids' },
        { date: '2023-10-05', diagnosis: 'Asthma Check-up', prescription: 'Inhaler' },
      ]
    },
  ]);

  const handleVoiceToggle = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      if (!isListening) {
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsListening(true);
          setVoiceCommand('Listening...');
        };
        
        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setVoiceCommand(transcript);
          
          // Process voice commands
          if (transcript.toLowerCase().includes('show patient')) {
            const patientName = transcript.toLowerCase().replace('show patient', '').trim();
            const patient = patients.find(p => 
              p.name.toLowerCase().includes(patientName)
            );
            if (patient) {
              setSelectedPatient(patient);
              setActiveTab('patients');
            }
          }
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    setTodaysSchedule(schedule => 
      schedule.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's Schedule - {new Date().toLocaleDateString()}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {todaysSchedule.map((appointment) => (
              <div
                key={appointment.id}
                className={`p-4 rounded-lg border ${
                  appointment.status === 'current'
                    ? 'border-blue-200 bg-blue-50'
                    : appointment.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className={`w-5 h-5 ${
                      appointment.status === 'current'
                        ? 'text-blue-600'
                        : appointment.status === 'completed'
                        ? 'text-green-600'
                        : 'text-gray-600'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-sm text-gray-600">{appointment.patient} (Age: {appointment.age})</p>
                      <p className="text-sm text-gray-500">{appointment.condition}</p>
                      <p className="text-xs text-gray-400">{appointment.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'current'
                        ? 'bg-blue-100 text-blue-800'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'upcoming' && (
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'current')}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Start
                      </button>
                    )}
                    {appointment.status === 'current' && (
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'completed')}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const patient = patients.find(p => p.name === appointment.patient);
                        if (patient) {
                          setSelectedPatient(patient);
                          setActiveTab('patients');
                        }
                      }}
                      className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                    >
                      View Patient
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Patient Records
            </h3>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">Age: {patient.age} | {patient.phone}</p>
                      <p className="text-sm text-gray-600">Last visit: {patient.lastVisit}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Last diagnosis:</span> {patient.diagnosis}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedPatient && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedPatient.name} - Detailed Record
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Basic Information</h5>
                    <div className="bg-white rounded p-3 text-sm">
                      <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                      <p><span className="font-medium">Phone:</span> {selectedPatient.phone}</p>
                      <p><span className="font-medium">Last Visit:</span> {selectedPatient.lastVisit}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Medical History</h5>
                    <div className="bg-white rounded p-3">
                      {selectedPatient.medicalHistory.map((condition: string, index: number) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Allergies</h5>
                    <div className="bg-white rounded p-3">
                      {selectedPatient.allergies.map((allergy: string, index: number) => (
                        <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Visit History</h5>
                    <div className="bg-white rounded p-3 space-y-2">
                      {selectedPatient.visits.map((visit: any, index: number) => (
                        <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                          <p className="text-sm font-medium">{visit.date}</p>
                          <p className="text-xs text-gray-600">Diagnosis: {visit.diagnosis}</p>
                          <p className="text-xs text-gray-600">Prescription: {visit.prescription}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      Add Prescription
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                      Update Record
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Voice Command Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">AI Voice Assistant</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleVoiceToggle}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
            } transition-colors`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <div className="flex-1">
            <p className="text-sm opacity-90">
              {isListening ? 'Listening for voice commands...' : 'Click to start voice command'}
            </p>
            {voiceCommand && (
              <p className="text-lg font-medium mt-1">{voiceCommand}</p>
            )}
          </div>
        </div>
        <div className="mt-4 text-sm opacity-75">
          <p>Try saying: "Show patient John Smith" or "What medications did I prescribe last visit?"</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Today's Schedule
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'patients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Patient Records
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'prescriptions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Prescriptions
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'schedule' && renderSchedule()}
      {activeTab === 'patients' && renderPatients()}
      {activeTab === 'prescriptions' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <FileText className="w-5 h-5 mr-2" />
            Prescription Management
          </h3>
          <p className="text-gray-600">Prescription management features will be available here.</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Patients</p>
              <p className="text-2xl font-bold text-gray-900">{todaysSchedule.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {todaysSchedule.filter(a => a.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;