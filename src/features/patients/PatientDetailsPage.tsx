import { useParams, useNavigate } from 'react-router-dom';
import { usePatientStore, type Patient } from '../../store/usePatientStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Activity, Calendar, FileText } from 'lucide-react';

export default function PatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  
  const patient = patients.find((p: Patient) => p.id === id);

  if (!patient) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Patient not found</h2>
        <Button onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ background: 'transparent', border: 'none', color: 'hsl(var(--foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '50%' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Patient Profile</h1>
          <p style={{ color: 'hsl(var(--foreground)/0.6)' }}>ID: {patient.id}</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
          <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '700' }}>
            {patient.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{patient.name}</h2>
            <p style={{ color: 'hsl(var(--foreground)/0.6)' }}>{patient.age} yrs • {patient.gender}</p>
          </div>
          <div style={{ 
            padding: '0.25rem 1rem', 
            borderRadius: '1rem', 
            backgroundColor: `hsl(var(--${patient.status === 'critical' ? 'destructive' : patient.status === 'recovering' ? 'warning' : 'success'}) / 0.1)`, 
            color: `hsl(var(--${patient.status === 'critical' ? 'destructive' : patient.status === 'recovering' ? 'warning' : 'success'}))`,
            textTransform: 'capitalize',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}>
            Status: {patient.status}
          </div>
        </Card>

        <Card style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity color="hsl(var(--primary))" /> Medical Information
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)', textTransform: 'uppercase' }}>Primary Condition</p>
              <p style={{ fontSize: '1rem', fontWeight: '500' }}>{patient.condition}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)', textTransform: 'uppercase' }}>Last Visit Date</p>
              <p style={{ fontSize: '1rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} /> {patient.lastVisit}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)', textTransform: 'uppercase' }}>General Notes</p>
              <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground)/0.8)', marginTop: '0.25rem' }}>
                Patient is responding well to the current treatment plan. Follow-up recommended in 2 weeks to monitor vitals and adjust medication if necessary.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText color="hsl(var(--primary))" /> Recent Labs / Reports
        </h3>
        <div style={{ color: 'hsl(var(--foreground)/0.6)', fontSize: '0.875rem' }}>
          No recent lab reports available for this patient.
        </div>
      </Card>
    </div>
  );
}
