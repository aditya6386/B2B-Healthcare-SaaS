import { Card } from '../../components/ui/Card';
import { Activity, Users, FileText, ClipboardList } from 'lucide-react';

export default function AnalyticsPage() {
  const statCards = [
    { label: 'Total Patients', value: '1,429', change: '+12%', icon: Users, color: 'var(--primary)' },
    { label: 'Pending Reports', value: '45', change: '-4%', icon: FileText, color: 'var(--warning)' },
    { label: 'Active Cases', value: '312', change: '+2%', icon: Activity, color: 'var(--destructive)' },
    { label: 'Completed Visits', value: '892', change: '+18%', icon: ClipboardList, color: 'var(--success)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <header>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>Analytics</h1>
        <p style={{ color: 'hsl(var(--foreground)/0.6)', fontSize: '0.875rem' }}>Overview of hospital performance</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((stat, i) => (
          <Card key={i} style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '1rem', 
              backgroundColor: `hsl(${stat.color} / 0.1)`,
              color: `hsl(${stat.color})` 
            }}>
              <stat.icon size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground)/0.6)', marginBottom: '0.25rem' }}>
                {stat.label}
              </p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</h3>
              <p style={{ fontSize: '0.75rem', color: stat.change.startsWith('+') ? 'hsl(var(--success))' : 'hsl(var(--destructive))', marginTop: '0.25rem' }}>
                {stat.change} from last month
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', flex: 1 }}>
        <Card style={{ padding: '1.5rem', minHeight: '300px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Patient Admissions</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingTop: '2rem' }}>
            {/* bar chart using css, will replace with chart library later */}
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', height: '100%' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  backgroundColor: 'hsl(var(--primary))', 
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 1s ease-out'
                }}></div>
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)' }}>Day {i+1}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
