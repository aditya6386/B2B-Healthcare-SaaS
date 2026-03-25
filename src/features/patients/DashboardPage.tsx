import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore, type Patient } from '../../store/usePatientStore';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Search, LayoutGrid, List as ListIcon, ChevronRight } from 'lucide-react';
import styles from './DashboardPage.module.css';

const mockPatients: Patient[] = [
  { id: '1', name: 'Aditya Patel', age: 45, gender: 'Male', condition: 'Hypertension', status: 'stable', lastVisit: '2026-03-15' },
  { id: '2', name: 'Aradhya singh', age: 32, gender: 'Female', condition: 'Type 2 Diabetes', status: 'recovering', lastVisit: '2026-02-10' },
  { id: '3', name: 'Arnav Verma', age: 78, gender: 'Male', condition: 'Heart Failure', status: 'critical', lastVisit: '2026-01-18' },
  { id: '4', name: 'Sunakshi Sinha', age: 28, gender: 'Female', condition: 'Asthma', status: 'stable', lastVisit: '2025-12-22' },
  { id: '5', name: 'Honey Singh', age: 55, gender: 'Male', condition: 'COPD', status: 'recovering', lastVisit: '2025-11-05' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { patients, viewMode, searchQuery, setPatients, setViewMode, setSearchQuery } = usePatientStore();

  useEffect(() => {
    // fake api delay to show loader 
    setTimeout(() => {
      setPatients(mockPatients);
    }, 500);
  }, [setPatients]);

  const filteredPatients = patients.filter((p: Patient) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const getStatusColor = (status: Patient['status']) => {
    switch(status) {
      case 'critical': return 'var(--destructive)';
      case 'recovering': return 'var(--warning)';
      case 'stable': return 'var(--success)';
      default: return 'var(--foreground)';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Manage and monitor patient status</p>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={18} />
            <Input 
              placeholder="Search patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <ListIcon size={18} />
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </header>

      {patients.length === 0 ? (
        <div className={styles.loading}>Loading patients...</div>
      ) : (
        <div className={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {filteredPatients.map((patient: Patient) => (
            <Card key={patient.id} className={styles.patientCard}>
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className={styles.avatar}>{patient.name.charAt(0)}</div>
                  <div>
                    <h3 className={styles.patientName}>{patient.name}</h3>
                    <p className={styles.patientMeta}>{patient.age} yrs • {patient.gender}</p>
                  </div>
                </div>
                <div 
                  className={styles.statusBadge} 
                  style={{ backgroundColor: `hsl(${getStatusColor(patient.status)} / 0.1)`, color: `hsl(${getStatusColor(patient.status)})` }}
                >
                  {patient.status}
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <div className={styles.infoGroup}>
                  <span className={styles.infoLabel}>Condition</span>
                  <span className={styles.infoValue}>{patient.condition}</span>
                </div>
                <div className={styles.infoGroup}>
                  <span className={styles.infoLabel}>Last Visit</span>
                  <span className={styles.infoValue}>{patient.lastVisit}</span>
                </div>
              </div>
              
              {viewMode === 'grid' ? (
                <div className={styles.cardFooter}>
                  <button className={styles.actionBtn} onClick={() => navigate(`/patients/${patient.id}`)}>
                    View Details
                  </button>
                </div>
              ) : (
                <div style={{ paddingRight: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    style={{ background: 'transparent', border: 'none', color: 'hsl(var(--primary))' }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </Card>
          ))}
          {filteredPatients.length === 0 && (
            <div className={styles.noResults}>No patients found matching "{searchQuery}"</div>
          )}
        </div>
      )}
    </div>
  );
}
