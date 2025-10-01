import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Layout from './components/Layout';
import AdminDashboard from './components/dashboards/AdminDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import PatientDashboard from './components/dashboards/PatientDashboard';
import MedicalDashboard from './components/dashboards/MedicalDashboard';
import OCRDashboard from './components/dashboards/OCRDashboard';

function App() {
  const { user, login, logout, isLoading } = useAuth();
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setLoginError('');
    const result = await login(email, password);
    if (!result.success) {
      setLoginError(result.error || 'Login failed');
    }
  };

  const getDashboardComponent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientDashboard />;
      case 'medical':
        return <MedicalDashboard />;
      case 'ocr':
        return <OCRDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} isLoading={isLoading} error={loginError} />;
  }

  return (
    <Layout user={user} onLogout={logout}>
      {getDashboardComponent()}
    </Layout>
  );
}

export default App;