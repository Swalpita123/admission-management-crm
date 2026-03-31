import React, { useState } from 'react';
import api from '../services/api';
import { TicketIcon, UserIcon, AcademicCapIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function SeatAllocation() {
  const [allocation, setAllocation] = useState({
    applicantId: '',
    programId: '',
    quota: ''
  });
  const [successData, setSuccessData] = useState(null);

  const styles = {
    container: { maxWidth: '700px', margin: '0 auto', padding: '20px' },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      marginTop: '24px'
    },
    inputWrapper: { marginBottom: '24px' },
    label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '2px solid #f1f5f9',
      fontSize: '15px',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: '#f8fafc'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '2px solid #f1f5f9',
      backgroundColor: '#f8fafc',
      fontSize: '15px',
      cursor: 'pointer'
    },
    button: {
      backgroundColor: '#0f172a', // Deep dark blue for "Finalize" actions
      color: '#fff',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    successBanner: {
      backgroundColor: '#ecfdf5',
      border: '1px solid #10b981',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px',
      textAlign: 'center',
      color: '#065f46'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessData(null); // Reset success state
    try {
      const res = await api.post('/admission/allocate', allocation);
      setSuccessData(res.data.admissionNumber);
      setAllocation({ applicantId: '', programId: '', quota: '' });
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Seat Allocation
        </h1>
        <p style={{ color: '#64748b' }}>Assign a specific program and quota to an applicant.</p>
      </header>

      {successData && (
        <div style={styles.successBanner}>
          <CheckCircleIcon style={{ width: '40px', margin: '0 auto 10px', color: '#10b981' }} />
          <h3 style={{ margin: '0 0 5px 0' }}>Allocation Successful!</h3>
          <p style={{ margin: 0 }}>Admission Number: <strong>{successData}</strong></p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserIcon style={{ width: '16px' }} /> Applicant ID
            </div>
          </label>
          <input
            style={styles.input}
            placeholder="Search or enter ID (e.g. APP-101)"
            value={allocation.applicantId}
            onChange={e => setAllocation({ ...allocation, applicantId: e.target.value })}
            required
          />
        </div>

        <div style={styles.inputWrapper}>
          <label style={styles.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AcademicCapIcon style={{ width: '16px' }} /> Program / Course ID
            </div>
          </label>
          <input
            style={styles.input}
            placeholder="e.g. CS-2024"
            value={allocation.programId}
            onChange={e => setAllocation({ ...allocation, programId: e.target.value })}
            required
          />
        </div>

        <div style={styles.inputWrapper}>
          <label style={styles.label}>Allocation Quota</label>
          <select
            style={styles.select}
            value={allocation.quota}
            onChange={e => setAllocation({ ...allocation, quota: e.target.value })}
            required
          >
            <option value="">Select Quota Type</option>
            <option value="KCET">KCET (Govt)</option>
            <option value="COMEDK">COMEDK</option>
            <option value="Management">Management</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1e293b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#0f172a'}
        >
          <TicketIcon style={{ width: '20px' }} />
          Confirm Allocation
        </button>
      </form>

      <footer style={{ marginTop: '30px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
        Note: Once allocated, a seat is reserved until document verification is complete.
      </footer>
    </div>
  );
}

export default SeatAllocation;