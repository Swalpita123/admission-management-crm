import React, { useState } from 'react';
import api from '../services/api';
import { UserIcon, IdentificationIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

function ApplicantForm() {
  const [applicant, setApplicant] = useState({
    name: '',
    category: '',
    entryType: '',
    quotaType: '',
    marks: 0,
    documents: 'Pending',
    feeStatus: 'Pending'
  });

  const styles = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '20px' },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      padding: '32px',
      marginTop: '24px'
    },
    header: { marginBottom: '32px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
    fullWidth: { gridColumn: '1 / -1' },
    label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '15px',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: '#fdfdfd'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      backgroundColor: '#ffffff',
      fontSize: '15px',
      cursor: 'pointer'
    },
    button: {
      backgroundColor: '#0284c7',
      color: '#fff',
      padding: '14px 28px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px',
      boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)'
    },
    sectionHeading: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#0284c7',
      fontWeight: '700',
      textTransform: 'uppercase',
      marginBottom: '20px',
      marginTop: '10px'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/applicant', applicant);
      alert('Applicant created successfully!');
      setApplicant({
        name: '', category: '', entryType: '', quotaType: '',
        marks: 0, documents: 'Pending', feeStatus: 'Pending'
      });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>New Application</h1>
        <p style={{ color: '#64748b' }}>Register a new student for the current admission cycle.</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
        {/* Profile Section */}
        <div style={styles.sectionHeading}>
          <UserIcon style={{ width: '18px' }} /> Personal Details
        </div>
        <div style={styles.grid}>
          <div style={styles.fullWidth}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              placeholder="Enter student's full name"
              value={applicant.name}
              onChange={e => setApplicant({ ...applicant, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={styles.label}>Category</label>
            <select
              style={styles.select}
              value={applicant.category}
              onChange={e => setApplicant({ ...applicant, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="GM">General Merit (GM)</option>
              <option value="SC">Scheduled Caste (SC)</option>
              <option value="ST">Scheduled Tribe (ST)</option>
              <option value="OBC">Other Backward Class (OBC)</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Academic Marks (%)</label>
            <input
              style={styles.input}
              type="number"
              placeholder="0.00"
              value={applicant.marks}
              onChange={e => setApplicant({ ...applicant, marks: Number(e.target.value) })}
              required
            />
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

        {/* Admission Details */}
        <div style={styles.sectionHeading}>
          <IdentificationIcon style={{ width: '18px' }} /> Admission Path
        </div>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Entry Type</label>
            <select
              style={styles.select}
              value={applicant.entryType}
              onChange={e => setApplicant({ ...applicant, entryType: e.target.value })}
              required
            >
              <option value="">Select Type</option>
              <option value="Regular">Regular (1st Year)</option>
              <option value="Lateral">Lateral (2nd Year)</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Quota Type</label>
            <select
              style={styles.select}
              value={applicant.quotaType}
              onChange={e => setApplicant({ ...applicant, quotaType: e.target.value })}
              required
            >
              <option value="">Select Quota</option>
              <option value="KCET">KCET</option>
              <option value="COMEDK">COMEDK</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

        {/* Status Section */}
        <div style={styles.sectionHeading}>
          <ClipboardDocumentListIcon style={{ width: '18px' }} /> Verification Status
        </div>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Document Status</label>
            <select
              style={styles.select}
              value={applicant.documents}
              onChange={e => setApplicant({ ...applicant, documents: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Fee Payment</label>
            <select
              style={styles.select}
              value={applicant.feeStatus}
              onChange={e => setApplicant({ ...applicant, feeStatus: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Register Applicant
        </button>
      </form>
    </div>
  );
}

export default ApplicantForm;