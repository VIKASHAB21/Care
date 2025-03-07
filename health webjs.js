// Patient component with prescription data, patient details and view button
import React, { useState } from 'react';

function PatientPrescriptionSystem() {
  // Sample patient data with prescriptions
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@example.com",
      phone: "555-123-4567",
      address: "123 Main St, Anytown, USA",
      bloodType: "O+",
      allergies: "Penicillin",
      medicalHistory: "Hypertension, High Cholesterol",
      prescriptions: [
        { id: 101, medication: "Lisinopril", dosage: "10mg", frequency: "Daily", startDate: "2025-02-15", endDate: "2025-05-15" },
        { id: 102, medication: "Atorvastatin", dosage: "20mg", frequency: "Daily", startDate: "2025-01-10", endDate: "2025-07-10" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 38,
      gender: "Female",
      email: "jane.smith@example.com",
      phone: "555-987-6543",
      address: "456 Oak Ave, Somewhere, USA",
      bloodType: "A-",
      allergies: "Sulfa drugs",
      medicalHistory: "Diabetes Type 2",
      prescriptions: [
        { id: 103, medication: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2025-02-20", endDate: "2025-08-20" }
      ]
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 62,
      gender: "Male",
      email: "robert.johnson@example.com",
      phone: "555-456-7890",
      address: "789 Pine Ln, Elsewhere, USA",
      bloodType: "B+",
      allergies: "None",
      medicalHistory: "Arthritis",
      prescriptions: []
    }
  ]);

  // State to manage the modal visibility and selected patient
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [addPatientModalVisible, setAddPatientModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPrescription, setNewPrescription] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: ""
  });
  
  // State for new patient
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    bloodType: "",
    allergies: "",
    medicalHistory: "",
    prescriptions: []
  });

  // Function to view patient prescriptions
  const viewPrescriptions = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  // Function to view patient details
  const viewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setDetailsModalVisible(true);
  };

  // Function to add new prescription
  const addPrescription = () => {
    if (!newPrescription.medication || !newPrescription.dosage || !newPrescription.frequency) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedPatients = patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const updatedPatient = {
          ...patient,
          prescriptions: [
            ...patient.prescriptions,
            {
              id: Date.now(), // Simple ID generation
              ...newPrescription
            }
          ]
        };
        setSelectedPatient(updatedPatient);
        return updatedPatient;
      }
      return patient;
    });

    setPatients(updatedPatients);
    setNewPrescription({
      medication: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: ""
    });
  };

  // Function to open add patient modal
  const openAddPatientModal = () => {
    setAddPatientModalVisible(true);
  };

  // Function to add new patient
  const addPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender) {
      alert("Please fill in all required fields (Name, Age, and Gender)");
      return;
    }

    const newPatientWithId = {
      ...newPatient,
      id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1
    };

    setPatients([...patients, newPatientWithId]);
    setAddPatientModalVisible(false);
    setNewPatient({
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      bloodType: "",
      allergies: "",
      medicalHistory: "",
      prescriptions: []
    });
  };

  // Function to update patient details
  const updatePatientDetails = () => {
    const updatedPatients = patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        return selectedPatient;
      }
      return patient;
    });

    setPatients(updatedPatients);
    setDetailsModalVisible(false);
  };

  // Function to delete a patient
  const deletePatient = (patientId) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      const updatedPatients = patients.filter(patient => patient.id !== patientId);
      setPatients(updatedPatients);
    }
  };

  // Function to close modals
  const closeModal = () => {
    setModalVisible(false);
    setDetailsModalVisible(false);
    setSelectedPatient(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Management System</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search patients..." 
          className="p-2 border rounded w-64"
        />
        <button
          onClick={openAddPatientModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Patient
        </button>
      </div>
      
      {/* Patient List Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescriptions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map(patient => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.prescriptions.length}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => viewPatientDetails(patient)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => viewPrescriptions(patient)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Prescriptions
                  </button>
                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prescription Modal */}
      {modalVisible && selectedPatient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium">
                Prescriptions for {selectedPatient.name}
              </h3>
            </div>
            
            <div className="p-6">
              {selectedPatient.prescriptions.length > 0 ? (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Current Prescriptions</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Medication</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Dosage</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Frequency</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Start Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPatient.prescriptions.map(prescription => (
                        <tr key={prescription.id}>
                          <td className="px-4 py-2">{prescription.medication}</td>
                          <td className="px-4 py-2">{prescription.dosage}</td>
                          <td className="px-4 py-2">{prescription.frequency}</td>
                          <td className="px-4 py-2">{prescription.startDate}</td>
                          <td className="px-4 py-2">{prescription.endDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic mb-4">No prescriptions found for this patient.</p>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Add New Prescription</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Medication*</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={newPrescription.medication}
                      onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dosage*</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={newPrescription.dosage}
                      onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Frequency*</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={newPrescription.frequency}
                      onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={newPrescription.startDate}
                      onChange={(e) => setNewPrescription({...newPrescription, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={newPrescription.endDate}
                      onChange={(e) => setNewPrescription({...newPrescription, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={addPrescription}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Add Prescription
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {detailsModalVisible && selectedPatient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium">
                Patient Details: {selectedPatient.name}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={selectedPatient.name}
                    onChange={(e) => setSelectedPatient({...selectedPatient, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age*</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={selectedPatient.age}
                    onChange={(e) => setSelectedPatient({...selectedPatient, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender*</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedPatient.gender}
                    onChange={(e) => setSelectedPatient({...selectedPatient, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={selectedPatient.email}
                    onChange={(e) => setSelectedPatient({...selectedPatient, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={selectedPatient.phone}
                    onChange={(e) => setSelectedPatient({...selectedPatient, phone: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={selectedPatient.address}
                    onChange={(e) => setSelectedPatient({...selectedPatient, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Blood Type</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedPatient.bloodType}
                    onChange={(e) => setSelectedPatient({...selectedPatient, bloodType: e.target.value})}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Allergies</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={selectedPatient.allergies}
                    onChange={(e) => setSelectedPatient({...selectedPatient, allergies: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Medical History</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    value={selectedPatient.medicalHistory}
                    onChange={(e) => setSelectedPatient({...selectedPatient, medicalHistory: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={updatePatientDetails}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Patient Modal */}
      {addPatientModalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium">
                Add New Patient
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age*</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender*</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Blood Type</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newPatient.bloodType}
                    onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Allergies</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newPatient.allergies}
                    onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Medical History</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={addPatient}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Add Patient
              </button>
              <button
                onClick={() => setAddPatientModalVisible(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPrescriptionSystem;