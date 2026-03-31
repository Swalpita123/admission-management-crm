// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// function Dashboard() {
//   const [stats, setStats] = useState({
//     totalIntake: 0,
//     admitted: 0,
//     remaining: 0,
//     pendingDocs: 0,
//     pendingFees: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get('/dashboard');
//         setStats(res.data);
//       } catch (err) {
//         alert('Error loading dashboard: ' + (err.response?.data?.error || err.message));
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div style={{ margin: '20px' }}>
//       <h2>Admission Dashboard</h2>
//       <table border="1" cellPadding="10">
//         <tbody>
//           <tr>
//             <td>Total Intake</td>
//             <td>{stats.totalIntake}</td>
//           </tr>
//           <tr>
//             <td>Admitted</td>
//             <td>{stats.admitted}</td>
//           </tr>
//           <tr>
//             <td>Remaining Seats</td>
//             <td>{stats.remaining}</td>
//           </tr>
//           <tr>
//             <td>Applicants with Pending Documents</td>
//             <td>{stats.pendingDocs}</td>
//           </tr>
//           <tr>
//             <td>Applicants with Pending Fees</td>
//             <td>{stats.pendingFees}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  UsersIcon,
  CheckBadgeIcon,
  UserPlusIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const [stats, setStats] = useState({
    totalIntake: 0,
    admitted: 0,
    remaining: 0,
    pendingDocs: 0,
    pendingFees: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Inline Styles Object
  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      marginBottom: '32px',
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '24px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px'
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    iconBox: (bgColor) => ({
      padding: '12px',
      borderRadius: '50%',
      backgroundColor: bgColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    value: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#0f172a',
      margin: '12px 0 4px 0'
    },
    desc: {
      fontSize: '14px',
      color: '#64748b'
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bg, desc }) => (
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={styles.label}>{title}</span>
        <div style={styles.iconBox(bg)}>
          <Icon style={{ width: '24px', height: '24px', color: color }} />
        </div>
      </div>
      <div style={styles.value}>{value}</div>
      <div style={styles.desc}>{desc}</div>
    </div>
  );

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
          Admission Dashboard
        </h1>
        <p style={{ color: '#64748b', marginTop: '8px' }}>Overview of current enrollment metrics</p>
      </div>

      <div style={styles.grid}>
        <StatCard 
          title="Total Intake" 
          value={stats.totalIntake} 
          icon={UsersIcon} 
          bg="#f1f5f9" 
          color="#475569"
          desc="Total capacity"
        />
        <StatCard 
          title="Admitted" 
          value={stats.admitted} 
          icon={CheckBadgeIcon} 
          bg="#ecfdf5" 
          color="#059669"
          desc="Enrolled students"
        />
        <StatCard 
          title="Remaining" 
          value={stats.remaining} 
          icon={UserPlusIcon} 
          bg="#f0f9ff" 
          color="#0284c7"
          desc="Available seats"
        />
        <StatCard 
          title="Pending Docs" 
          value={stats.pendingDocs} 
          icon={DocumentTextIcon} 
          bg="#fffbeb" 
          color="#d97706"
          desc="Needs attention"
        />
        <StatCard 
          title="Pending Fees" 
          value={stats.pendingFees} 
          icon={CurrencyDollarIcon} 
          bg="#fff1f2" 
          color="#e11d48"
          desc="Unpaid balance"
        />
      </div>
    </div>
  );
}

export default Dashboard;