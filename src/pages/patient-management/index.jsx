import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PatientTable from './components/PatientTable';
import PatientFilters from './components/PatientFilters';
import BulkActions from './components/BulkActions';
import PatientStats from './components/PatientStats';
import AddPatientModal from './components/AddPatientModal';

const PatientManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);

  // Mock patient data
  const [patients, setPatients] = useState([
   {
  id: 1,
  patientId: "PAT001",
  name: "Ananya Iyer",
  age: 32,
  gender: "female",
  phone: "+91 98765 43210",
  email: "ananya.iyer@email.com",
  address: "123 MG Road, Bangalore, Karnataka 560001",
  dietaryPreference: "vegetarian",
  healthConditions: ["diabetes", "hypertension"],
  status: "active",
  dietPlan: "Diabetic-Friendly Ayurvedic Plan",
  dietPlanStatus: "Active",
  lastConsultation: "2024-01-08T10:30:00Z",
  emergencyContact: "Raj Sharma",
  emergencyPhone: "+91 98765 43211",
  createdAt: "2023-12-15T09:00:00Z"
},
{
  id: 2,
  patientId: "PAT002",
  name: "Karan Desai",
  age: 45,
  gender: "male",
  phone: "+91 87654 32109",
  email: "karan.desai@email.com",
  address: "456 FC Road, Pune, Maharashtra 411005",
  dietaryPreference: "non-vegetarian",
  healthConditions: ["obesity", "digestive-issues"],
  status: "followup",
  dietPlan: "Weight Management Plan",
  dietPlanStatus: "Review Required",
  lastConsultation: "2024-01-05T14:15:00Z",
  emergencyContact: "Meera Patel",
  emergencyPhone: "+91 87654 32110",
  createdAt: "2023-11-20T11:30:00Z"
},
{
  id: 3,
  patientId: "PAT003",
  name: "Neha Verma",
  age: 28,
  gender: "female",
  phone: "+91 76543 21098",
  email: "neha.verma@email.com",
  address: "789 CP, New Delhi, Delhi 110001",
  dietaryPreference: "vegan",
  healthConditions: ["thyroid"],
  status: "active",
  dietPlan: "Thyroid Support Plan",
  dietPlanStatus: "Active",
  lastConsultation: "2024-01-09T16:45:00Z",
  emergencyContact: "Arjun Singh",
  emergencyPhone: "+91 76543 21099",
  createdAt: "2024-01-02T08:15:00Z"
},
{
  id: 4,
  patientId: "PAT004",
  name: "Siddharth Menon",
  age: 38,
  gender: "male",
  phone: "+91 65432 10987",
  email: "siddharth.menon@email.com",
  address: "321 Park Street, Kolkata, West Bengal 700016",
  dietaryPreference: "vegetarian",
  healthConditions: ["heart-disease", "hypertension"],
  status: "inactive",
  dietPlan: "Cardiac Care Plan",
  dietPlanStatus: "Completed",
  lastConsultation: "2023-11-15T12:00:00Z",
  emergencyContact: "Sunita Kumar",
  emergencyPhone: "+91 65432 10988",
  createdAt: "2023-10-10T10:00:00Z"
},
{
  id: 5,
  patientId: "PAT005",
  name: "Lakshmi Nair",
  age: 52,
  gender: "female",
  phone: "+91 54321 09876",
  email: "lakshmi.nair@email.com",
  address: "654 Jubilee Hills, Hyderabad, Telangana 500033",
  dietaryPreference: "vegetarian",
  healthConditions: ["arthritis", "digestive-issues"],
  status: "active",
  dietPlan: "Anti-Inflammatory Plan",
  dietPlanStatus: "Active",
  lastConsultation: "2024-01-10T09:30:00Z",
  emergencyContact: "Ravi Reddy",
  emergencyPhone: "+91 54321 09877",
  createdAt: "2023-12-01T14:20:00Z"
},
{
  id: 6,
  patientId: "PAT006",
  name: "Vikram Joshi",
  age: 41,
  gender: "male",
  phone: "+91 43210 98765",
  email: "vikram.joshi@email.com",
  address: "987 Sector 17, Chandigarh, Punjab 160017",
  dietaryPreference: "jain",
  healthConditions: ["diabetes"],
  status: "followup",
  dietPlan: "Jain Diabetic Plan",
  dietPlanStatus: "Under Review",
  lastConsultation: "2024-01-03T11:15:00Z",
  emergencyContact: "Kavita Gupta",
  emergencyPhone: "+91 43210 98766",
  createdAt: "2023-11-25T16:45:00Z"
}

  ]);

  // Filter patients based on search and filters
  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  const handleFilterChange = (filters) => {
    let filtered = [...patients];

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(searchTerm) ||
        patient?.patientId?.toLowerCase()?.includes(searchTerm) ||
        patient?.phone?.includes(searchTerm) ||
        patient?.email?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(patient => patient?.status === filters?.status);
    }

    // Dietary preference filter
    if (filters?.dietaryPreference) {
      filtered = filtered?.filter(patient => patient?.dietaryPreference === filters?.dietaryPreference);
    }

    // Health condition filter
    if (filters?.healthCondition) {
      filtered = filtered?.filter(patient => 
        patient?.healthConditions?.includes(filters?.healthCondition)
      );
    }

    // Consultation status filter
    if (filters?.consultationStatus) {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

      filtered = filtered?.filter(patient => {
        const lastConsultation = new Date(patient.lastConsultation);
        
        switch (filters?.consultationStatus) {
          case 'recent':
            return lastConsultation >= thirtyDaysAgo;
          case 'overdue':
            return lastConsultation < ninetyDaysAgo;
          case 'scheduled':
            return patient?.status === 'active';
          case 'cancelled':
            return patient?.status === 'inactive';
          default:
            return true;
        }
      });
    }

    // Date range filter
    if (filters?.dateRange) {
      const now = new Date();
      let startDate;

      switch (filters?.dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          const quarterStart = Math.floor(now?.getMonth() / 3) * 3;
          startDate = new Date(now.getFullYear(), quarterStart, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered?.filter(patient => 
          new Date(patient.lastConsultation) >= startDate
        );
      }
    }

    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const handleAddPatient = async (newPatient) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  const handleEditPatient = (patient) => {
    navigate('/patient-profile', { state: { patient, mode: 'edit' } });
  };

  const handleDeletePatient = (patient) => {
    if (window.confirm(`Are you sure you want to delete ${patient?.name}'s record?`)) {
      setPatients(prev => prev?.filter(p => p?.id !== patient?.id));
      setSelectedPatients(prev => prev?.filter(id => id !== patient?.id));
    }
  };

  const handleViewProfile = (patient) => {
    navigate('/patient-profile', { state: { patient, mode: 'view' } });
  };

  const handleGenerateReport = (patient) => {
    console.log('Generating report for:', patient?.name);
    // Implement report generation logic
  };

  const handleBulkAction = (action, patientIds) => {
    console.log('Bulk action:', action, 'for patients:', patientIds);
    
    switch (action) {
      case 'export-csv':
      case 'export-excel': case'export-pdf':
        console.log(`Exporting ${patientIds?.length} patients as ${action?.split('-')?.[1]}`);
        break;
      case 'generate-reports':
        console.log(`Generating reports for ${patientIds?.length} patients`);
        break;
      case 'send-reminders':
        console.log(`Sending reminders to ${patientIds?.length} patients`);
        break;
      case 'archive':
        console.log(`Archiving ${patientIds?.length} patients`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${patientIds?.length} patient records?`)) {
          setPatients(prev => prev?.filter(p => !patientIds?.includes(p?.id)));
          setSelectedPatients([]);
        }
        break;
      default:
        console.log('Unknown bulk action:', action);
    }
  };

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients?.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients?.length / patientsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <Header
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setMobileSidebarOpen(true)}
      />
      <main className={`transition-all duration-300 ease-out pt-16 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Patient Management
              </h1>
              <p className="font-body text-muted-foreground">
                Manage patient records, profiles, and treatment plans efficiently
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Export all patients')}
              >
                Export Data
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowAddModal(true)}
              >
                Add Patient
              </Button>
            </div>
          </div>

          {/* Patient Statistics */}
          <PatientStats patients={patients} />

          {/* Filters */}
          <PatientFilters
            onFilterChange={handleFilterChange}
            totalCount={patients?.length}
            filteredCount={filteredPatients?.length}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedPatients={selectedPatients}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedPatients([])}
          />

          {/* Patient Table */}
          <PatientTable
            patients={currentPatients}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
            onViewProfile={handleViewProfile}
            onGenerateReport={handleGenerateReport}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <span className="font-body text-sm text-muted-foreground">
                  Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, filteredPatients?.length)} of {filteredPatients?.length} patients
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="w-10 h-10"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddPatient={handleAddPatient}
      />
      {/* Floating Action Button (Mobile) */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-soft-lg lg:hidden z-40"
      >
        <Icon name="Plus" size={24} />
      </Button>
    </div>
  );
};

export default PatientManagement;