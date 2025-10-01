import React from 'react';
import { User } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Pill, 
  Scan,
  LogOut,
  Bell,
  Settings
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const getSidebarItems = () => {
    if (!user) return [];

    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', href: '#dashboard' },
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: Users, label: 'User Management', href: '#users' },
          { icon: Calendar, label: 'Appointments', href: '#appointments' },
          { icon: Pill, label: 'Inventory', href: '#inventory' },
          { icon: Scan, label: 'OCR System', href: '#ocr' },
          { icon: Settings, label: 'Settings', href: '#settings' },
        ];
      case 'doctor':
        return [
          ...commonItems,
          { icon: Calendar, label: 'My Schedule', href: '#schedule' },
          { icon: Users, label: 'Patients', href: '#patients' },
          { icon: Pill, label: 'Prescriptions', href: '#prescriptions' },
        ];
      case 'patient':
        return [
          ...commonItems,
          { icon: Calendar, label: 'Book Appointment', href: '#book' },
          { icon: Calendar, label: 'My Appointments', href: '#my-appointments' },
          { icon: Pill, label: 'My Prescriptions', href: '#my-prescriptions' },
        ];
      case 'medical':
        return [
          ...commonItems,
          { icon: Pill, label: 'Inventory', href: '#inventory' },
          { icon: Calendar, label: 'Prescription Requests', href: '#requests' },
        ];
      case 'ocr':
        return [
          ...commonItems,
          { icon: Scan, label: 'Process Prescriptions', href: '#process' },
          { icon: Pill, label: 'Medicine Database', href: '#medicines' },
        ];
      default:
        return commonItems;
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      doctor: 'bg-blue-100 text-blue-800',
      patient: 'bg-green-100 text-green-800',
      medical: 'bg-purple-100 text-purple-800',
      ocr: 'bg-orange-100 text-orange-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">MediCare System</h1>
          {user && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">{user.full_name}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleColor(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          )}
        </div>
        
        <nav className="mt-6">
          {getSidebarItems().map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Handle navigation if needed
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
            </h2>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;