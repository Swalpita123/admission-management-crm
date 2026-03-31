import React, { useState } from 'react';
import api from '../services/api';
import { BeakerIcon, ChartPieIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function MasterSetup() {
  const [program, setProgram] = useState({
    name: '',
    department: '',
    intake: 0,
    quotas: { KCET: 0, COMEDK: 0, Management: 0 }
  });

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      marginTop: '24px'
    },
    header: {
      marginBottom: '32px'
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    inputGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '24px'
    },
    fullWidth: {
      gridColumn: '1 / -1'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#334155',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '15px',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'border-color 0.2s',
      ':focus': { borderColor: '#0284c7' }
    },
    button: {
      backgroundColor: '#0284c7',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px',
      transition: 'background-color 0.2s'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/master/program', program);
      alert('Program created successfully!');
      setProgram({
        name: '',
        department: '',
        intake: 0,
        quotas: { KCET: 0, COMEDK: 0, Management: 0 }
      });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Master Setup</h1>
        <p style={{ color: '#64748b' }}>Configure new academic programs and seat quotas.</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
        {/* Basic Info Section */}
        <div style={styles.sectionTitle}>
          <BeakerIcon style={{ width: '18px' }} /> Basic Information
        </div>
        
        <div style={styles.inputGroup}>
          <div style={styles.fullWidth}>
            <label style={styles.label}>Program Name</label>
            <input
              style={styles.input}
              placeholder="e.g. Computer Science & Engineering"
              value={program.name}
              onChange={e => setProgram({ ...program, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={styles.label}>Department</label>
            <input
              style={styles.input}
              placeholder="e.g. Engineering"
              value={program.department}
              onChange={e => setProgram({ ...program, department: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={styles.label}>Total Intake</label>
            <input
              style={styles.input}
              type="number"
              value={program.intake}
              onChange={e => setProgram({ ...program, intake: Number(e.target.value) })}
              required
            />
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

        {/* Quota Section */}
        <div style={styles.sectionTitle}>
          <ChartPieIcon style={{ width: '18px' }} /> Seat Quotas
        </div>

        <div style={styles.inputGroup}>
          <div>
            <label style={styles.label}>KCET Seats</label>
            <input
              style={styles.input}
              type="number"
              value={program.quotas.KCET}
              onChange={e => setProgram({ ...program, quotas: { ...program.quotas, KCET: Number(e.target.value) } })}
            />
          </div>
          <div>
            <label style={styles.label}>COMEDK Seats</label>
            <input
              style={styles.input}
              type="number"
              value={program.quotas.COMEDK}
              onChange={e => setProgram({ ...program, quotas: { ...program.quotas, COMEDK: Number(e.target.value) } })}
            />
          </div>
          <div style={styles.fullWidth}>
            <label style={styles.label}>Management Seats</label>
            <input
              style={styles.input}
              type="number"
              value={program.quotas.Management}
              onChange={e => setProgram({ ...program, quotas: { ...program.quotas, Management: Number(e.target.value) } })}
            />
          </div>
        </div>

        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0369a1'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#0284c7'}
        >
          Save Program Configuration
        </button>
      </form>
    </div>
  );
}

export default MasterSetup;