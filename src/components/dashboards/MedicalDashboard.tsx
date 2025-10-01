import React, { useState } from 'react';
import { Pill, Package, AlertTriangle, TrendingDown, Search, Plus, CreditCard as Edit, Trash2, Calendar, X, Check } from 'lucide-react';

const MedicalDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showEditMedicine, setShowEditMedicine] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('inventory');

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      manufacturer: 'PharmaCorp',
      dosage: '500mg',
      form: 'Tablet',
      currentStock: 850,
      minStock: 100,
      unitPrice: 0.15,
      expiryDate: '2025-06-15',
      batchNumber: 'PC2024001',
      status: 'in-stock',
    },
    {
      id: 2,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      manufacturer: 'MediTech',
      dosage: '250mg',
      form: 'Capsule',
      currentStock: 45,
      minStock: 50,
      unitPrice: 0.35,
      expiryDate: '2024-12-30',
      batchNumber: 'MT2024002',
      status: 'low-stock',
    },
    {
      id: 3,
      name: 'Insulin',
      genericName: 'Human Insulin',
      manufacturer: 'BioMed',
      dosage: '100IU/ml',
      form: 'Injection',
      currentStock: 25,
      minStock: 30,
      unitPrice: 25.50,
      expiryDate: '2024-03-15',
      batchNumber: 'BM2024003',
      status: 'expiring-soon',
    },
    {
      id: 4,
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      manufacturer: 'CardioMed',
      dosage: '10mg',
      form: 'Tablet',
      currentStock: 200,
      minStock: 75,
      unitPrice: 0.45,
      expiryDate: '2025-11-20',
      batchNumber: 'CM2024004',
      status: 'in-stock',
    },
  ]);

  const [prescriptionRequests, setPrescriptionRequests] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      doctorName: 'Dr. Johnson',
      requestDate: '2024-01-18',
      medicines: [
        { name: 'Paracetamol', quantity: 30, dosage: '500mg' },
        { name: 'Amoxicillin', quantity: 21, dosage: '250mg' },
      ],
      status: 'pending',
      priority: 'normal',
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      doctorName: 'Dr. Smith',
      requestDate: '2024-01-18',
      medicines: [
        { name: 'Insulin', quantity: 3, dosage: '100IU/ml' },
      ],
      status: 'urgent',
      priority: 'high',
    },
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    genericName: '',
    manufacturer: '',
    dosage: '',
    form: 'Tablet',
    currentStock: 0,
    minStock: 0,
    unitPrice: 0,
    expiryDate: '',
    batchNumber: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiring-soon':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const determineStatus = (currentStock: number, minStock: number, expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry <= 30) return 'expiring-soon';
    if (currentStock <= minStock) return 'low-stock';
    return 'in-stock';
  };

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.currentStock >= 0) {
      const medicine = {
        id: inventory.length + 1,
        ...newMedicine,
        status: determineStatus(newMedicine.currentStock, newMedicine.minStock, newMedicine.expiryDate),
      };
      setInventory([...inventory, medicine]);
      setNewMedicine({
        name: '',
        genericName: '',
        manufacturer: '',
        dosage: '',
        form: 'Tablet',
        currentStock: 0,
        minStock: 0,
        unitPrice: 0,
        expiryDate: '',
        batchNumber: '',
      });
      setShowAddMedicine(false);
      alert('Medicine added successfully!');
    }
  };

  const handleEditMedicine = () => {
    if (selectedMedicine) {
      const updatedMedicine = {
        ...selectedMedicine,
        status: determineStatus(selectedMedicine.currentStock, selectedMedicine.minStock, selectedMedicine.expiryDate)
      };
      setInventory(inventory.map(item => 
        item.id === selectedMedicine.id ? updatedMedicine : item
      ));
      setShowEditMedicine(false);
      setSelectedMedicine(null);
      alert('Medicine updated successfully!');
    }
  };

  const handleDeleteMedicine = (id: number) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setInventory(inventory.filter(item => item.id !== id));
      alert('Medicine deleted successfully!');
    }
  };

  const handleProcessRequest = (requestId: number) => {
    const request = prescriptionRequests.find(r => r.id === requestId);
    if (request) {
      // Check stock availability
      let canProcess = true;
      const stockIssues: string[] = [];
      
      request.medicines.forEach(medicine => {
        const inventoryItem = inventory.find(item => 
          item.name.toLowerCase() === medicine.name.toLowerCase()
        );
        if (!inventoryItem) {
          stockIssues.push(`${medicine.name} not found in inventory`);
          canProcess = false;
        } else if (inventoryItem.currentStock < medicine.quantity) {
          stockIssues.push(`Insufficient stock for ${medicine.name} (Available: ${inventoryItem.currentStock}, Required: ${medicine.quantity})`);
          canProcess = false;
        }
      });

      if (!canProcess) {
        alert('Cannot process request:\n' + stockIssues.join('\n'));
        return;
      }

      // Update inventory
      const updatedInventory = inventory.map(item => {
        const requestedMedicine = request.medicines.find(m => 
          m.name.toLowerCase() === item.name.toLowerCase()
        );
        if (requestedMedicine) {
          const newStock = item.currentStock - requestedMedicine.quantity;
          return {
            ...item,
            currentStock: newStock,
            status: determineStatus(newStock, item.minStock, item.expiryDate)
          };
        }
        return item;
      });

      setInventory(updatedInventory);
      setPrescriptionRequests(requests => 
        requests.map(request => 
          request.id === requestId 
            ? { ...request, status: 'processed' }
            : request
        )
      );
      alert('Prescription request processed successfully!');
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Medicine Inventory ({filteredInventory.length} items)
            </h3>
            <button
              onClick={() => setShowAddMedicine(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </button>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines by name, generic name, or manufacturer..."
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
                  <th className="text-left py-2 font-medium text-gray-700">Medicine</th>
                  <th className="text-left py-2 font-medium text-gray-700">Stock</th>
                  <th className="text-left py-2 font-medium text-gray-700">Price</th>
                  <th className="text-left py-2 font-medium text-gray-700">Expiry</th>
                  <th className="text-left py-2 font-medium text-gray-700">Status</th>
                  <th className="text-left py-2 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.genericName}</p>
                        <p className="text-xs text-gray-500">{item.dosage} {item.form}</p>
                        <p className="text-xs text-gray-400">{item.manufacturer}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <div>
                        <p className={`font-medium ${item.currentStock <= item.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.currentStock}
                        </p>
                        <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                        <p className="text-xs text-gray-400">Batch: {item.batchNumber}</p>
                      </div>
                    </td>
                    <td className="py-3 text-gray-900 font-medium">${item.unitPrice.toFixed(2)}</td>
                    <td className="py-3">
                      <p className="text-gray-900">{item.expiryDate}</p>
                      <p className="text-xs text-gray-500">
                        {Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days
                      </p>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedMedicine(item);
                            setShowEditMedicine(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="Edit Medicine"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(item.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Delete Medicine"
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
          {filteredInventory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No medicines found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Prescription Requests ({prescriptionRequests.length})
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {prescriptionRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{request.patientName}</p>
                    <p className="text-sm text-gray-600">Prescribed by {request.doctorName}</p>
                    <p className="text-xs text-gray-500">Request Date: {request.requestDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.priority} priority
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'urgent' 
                        ? 'bg-red-100 text-red-800' 
                        : request.status === 'processed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <p className="text-sm font-medium text-gray-700">Requested Medicines:</p>
                  {request.medicines.map((medicine, index) => {
                    const inventoryItem = inventory.find(item => 
                      item.name.toLowerCase() === medicine.name.toLowerCase()
                    );
                    const available = inventoryItem ? inventoryItem.currentStock : 0;
                    const canFulfill = available >= medicine.quantity;
                    
                    return (
                      <div key={index} className={`rounded p-3 ${canFulfill ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {medicine.name} {medicine.dosage}
                            </p>
                            <p className="text-xs text-gray-600">Quantity: {medicine.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-medium ${canFulfill ? 'text-green-600' : 'text-red-600'}`}>
                              Available: {available}
                            </p>
                            {!canFulfill && (
                              <p className="text-xs text-red-500">Insufficient stock</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end mt-3 space-x-2">
                  {request.status !== 'processed' && (
                    <button
                      onClick={() => handleProcessRequest(request.id)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-3 h-3 inline mr-1" />
                      Process Request
                    </button>
                  )}
                  <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {prescriptionRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No prescription requests at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                Total value: ${inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inventory.filter(item => item.status === 'low-stock').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Requires restocking</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-red-600">
                {inventory.filter(item => item.status === 'expiring-soon').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Within 30 days</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {prescriptionRequests.filter(r => r.status !== 'processed').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'inventory'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Inventory Management
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Prescription Requests
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'inventory' && renderInventory()}
      {activeTab === 'requests' && renderRequests()}

      {/* Add Medicine Modal */}
      {showAddMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Medicine</h3>
              <button
                onClick={() => setShowAddMedicine(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter medicine name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name</label>
                <input
                  type="text"
                  value={newMedicine.genericName}
                  onChange={(e) => setNewMedicine({ ...newMedicine, genericName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter generic name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={newMedicine.manufacturer}
                  onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter manufacturer"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Form</label>
                  <select
                    value={newMedicine.form}
                    onChange={(e) => setNewMedicine({ ...newMedicine, form: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Cream">Cream</option>
                    <option value="Drops">Drops</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                  <input
                    type="number"
                    value={newMedicine.currentStock}
                    onChange={(e) => setNewMedicine({ ...newMedicine, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    value={newMedicine.minStock}
                    onChange={(e) => setNewMedicine({ ...newMedicine, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newMedicine.unitPrice}
                  onChange={(e) => setNewMedicine({ ...newMedicine, unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newMedicine.expiryDate}
                  onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                <input
                  type="text"
                  value={newMedicine.batchNumber}
                  onChange={(e) => setNewMedicine({ ...newMedicine, batchNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter batch number"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddMedicine(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedicine}
                disabled={!newMedicine.name}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Medicine Modal */}
      {showEditMedicine && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Medicine</h3>
              <button
                onClick={() => {
                  setShowEditMedicine(false);
                  setSelectedMedicine(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                <input
                  type="text"
                  value={selectedMedicine.name}
                  onChange={(e) => setSelectedMedicine({ ...selectedMedicine, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name</label>
                <input
                  type="text"
                  value={selectedMedicine.genericName}
                  onChange={(e) => setSelectedMedicine({ ...selectedMedicine, genericName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={selectedMedicine.manufacturer}
                  onChange={(e) => setSelectedMedicine({ ...selectedMedicine, manufacturer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                  <input
                    type="number"
                    value={selectedMedicine.currentStock}
                    onChange={(e) => setSelectedMedicine({ ...selectedMedicine, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    value={selectedMedicine.minStock}
                    onChange={(e) => setSelectedMedicine({ ...selectedMedicine, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={selectedMedicine.unitPrice}
                  onChange={(e) => setSelectedMedicine({ ...selectedMedicine, unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={selectedMedicine.expiryDate}
                  onChange={(e) => setSelectedMedicine({ ...selectedMedicine, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditMedicine(false);
                  setSelectedMedicine(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditMedicine}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Medicine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalDashboard;