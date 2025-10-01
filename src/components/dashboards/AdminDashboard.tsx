import React, { useState } from 'react';
import { Users, Calendar, Pill, TrendingUp, AlertCircle, Activity, UserCheck, Clock, Plus, CreditCard as Edit, Trash2, Search, Settings, Shield } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'admin@hospital.com',
      full_name: 'Administrator',
      role: 'admin',
      phone: '+1-234-567-8900',
      created_at: '2024-01-01',
      is_active: true,
    },
    {
      id: '2',
      email: 'doctor@hospital.com',
      full_name: 'Dr. Sarah Johnson',
      role: 'doctor',
      phone: '+1-234-567-8901',
      created_at: '2024-01-01',
      is_active: true,
    },
    {
      id: '3',
      email: 'patient@hospital.com',
      full_name: 'John Smith',
      role: 'patient',
      phone: '+1-234-567-8902',
      created_at: '2024-01-01',
      is_active: true,
    },
    {
      id: '4',
      email: 'medical@hospital.com',
      full_name: 'Medical Staff',
      role: 'medical',
      phone: '+1-234-567-8903',
      created_at: '2024-01-01',
      is_active: true,
    },
    {
      id: '5',
      email: 'ocr@hospital.com',
      full_name: 'OCR Specialist',
      role: 'ocr',
      phone: '+1-234-567-8904',
      created_at: '2024-01-01',
      is_active: true,
    },
  ]);

  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    role: 'patient',
    phone: '',
  });

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toString(),
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Today\'s Appointments',
      value: '45',
      change: '+8%',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Medicine Stock',
      value: '89%',
      change: '-3%',
      icon: Pill,
      color: 'bg-purple-500',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New patient registered',
      user: 'John Doe',
      time: '5 minutes ago',
      type: 'user',
    },
    {
      id: 2,
      action: 'Appointment scheduled',
      user: 'Dr. Smith',
      time: '10 minutes ago',
      type: 'appointment',
    },
    {
      id: 3,
      action: 'Medicine stock updated',
      user: 'Pharmacy Staff',
      time: '15 minutes ago',
      type: 'inventory',
    },
    {
      id: 4,
      action: 'OCR processing completed',
      user: 'OCR System',
      time: '20 minutes ago',
      type: 'ocr',
    },
  ];

  const alerts = [
    {
      id: 1,
      message: 'Low stock alert: Paracetamol (50 tablets remaining)',
      type: 'warning',
      time: '2 hours ago',
    },
    {
      id: 2,
      message: 'System backup completed successfully',
      type: 'success',
      time: '4 hours ago',
    },
    {
      id: 3,
      message: 'Failed login attempts detected from IP: 192.168.1.100',
      type: 'error',
      time: '6 hours ago',
    },
  ];

  const handleAddUser = () => {
    if (newUser.full_name && newUser.email) {
      const user = {
        id: (users.length + 1).toString(),
        ...newUser,
        created_at: new Date().toISOString().split('T')[0],
        is_active: true,
      };
      setUsers([...users, user]);
      setNewUser({ full_name: '', email: '', role: 'patient', phone: '' });
      setShowAddUser(false);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_active: !user.is_active } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditUser = (user: any) => {
    setNewUser(user);
    setShowAddUser(true);
  };

  const handleUpdateUser = () => {
    if (newUser.full_name && newUser.email) {
      setUsers(users.map(user => 
        user.id === newUser.id ? newUser : user
      ));
      setNewUser({ full_name: '', email: '', role: 'patient', phone: '' });
      setShowAddUser(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activities
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'appointment' ? 'bg-green-100' :
                      activity.type === 'inventory' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      {activity.type === 'user' && <UserCheck className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'appointment' && <Calendar className="w-4 h-4 text-green-600" />}
                      {activity.type === 'inventory' && <Pill className="w-4 h-4 text-purple-600" />}
                      {activity.type === 'ocr' && <Activity className="w-4 h-4 text-orange-600" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              System Alerts
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'success' ? 'bg-green-50 border-green-400' :
                  'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle className={`w-5 h-5 ${
                        alert.type === 'warning' ? 'text-yellow-600' :
                        alert.type === 'success' ? 'text-green-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800' :
                        alert.type === 'success' ? 'text-green-800' :
                        'text-red-800'
                      }`}>
                        {alert.message}
                      </p>
                      <p className={`text-xs mt-1 ${
                        alert.type === 'warning' ? 'text-yellow-600' :
                        alert.type === 'success' ? 'text-green-600' :
                        'text-red-600'
                      }`}>
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Management
            </h3>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-700">Name</th>
                  <th className="text-left py-2 font-medium text-gray-700">Email</th>
                  <th className="text-left py-2 font-medium text-gray-700">Role</th>
                  <th className="text-left py-2 font-medium text-gray-700">Phone</th>
                  <th className="text-left py-2 font-medium text-gray-700">Status</th>
                  <th className="text-left py-2 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{user.full_name}</td>
                    <td className="py-3 text-gray-600">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">{user.phone}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`p-1 rounded ${
                            user.is_active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                          }`}
                          title={user.is_active ? 'Deactivate User' : 'Activate User'}
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {newUser.id ? 'Edit User' : 'Add New User'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="medical">Medical Staff</option>
                  <option value="ocr">OCR Specialist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {newUser.id ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              System Settings
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUserManagement()}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Settings className="w-5 h-5 mr-2" />
            System Settings
          </h3>
          <p className="text-gray-600">System configuration options will be available here.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;