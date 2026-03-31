// import React, { useState } from 'react';
// import api from '../services/api';
// import {
//   ShieldCheckIcon,
//   HashtagIcon,
//   CheckCircleIcon,
//   ExclamationCircleIcon
// } from '@heroicons/react/24/outline';

// function AdmissionConfirmation() {
//   const [admissionId, setAdmissionId] = useState('');
//   const [status, setStatus] = useState({ type: '', message: '' });

//   const styles = {
//     container: { maxWidth: '600px', margin: '40px auto', padding: '20px' },
//     card: {
//       backgroundColor: '#ffffff',
//       borderRadius: '20px',
//       border: '1px solid #e2e8f0',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//       padding: '40px',
//       textAlign: 'center'
//     },
//     inputWrapper: {
//       position: 'relative',
//       margin: '30px 0'
//     },
//     input: {
//       width: '100%',
//       padding: '16px 16px 16px 48px',
//       borderRadius: '12px',
//       border: '2px solid #e2e8f0',
//       fontSize: '18px',
//       fontWeight: '600',
//       letterSpacing: '1px',
//       outline: 'none',
//       transition: 'border-color 0.2s',
//       boxSizing: 'border-box'
//     },
//     icon: {
//       position: 'absolute',
//       left: '16px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '24px',
//       color: '#94a3b8'
//     },
//     button: {
//       backgroundColor: '#059669', // Success Green
//       color: '#ffffff',
//       padding: '16px 32px',
//       borderRadius: '12px',
//       border: 'none',
//       fontSize: '16px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       width: '100%',
//       transition: 'background-color 0.2s',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '10px'
//     },
//     checklist: {
//       marginTop: '30px',
//       padding: '20px',
//       backgroundColor: '#f8fafc',
//       borderRadius: '12px',
//       textAlign: 'left'
//     },
//     checkItem: {
//       fontSize: '13px',
//       color: '#64748b',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       marginBottom: '8px'
//     }
//   };

//   const handleConfirm = async (e) => {
//     e.preventDefault();
//     setStatus({ type: '', message: '' });
//     try {
//       const res = await api.post('/admission/confirm', { admissionId });
//      if (res.data.confirmed) {
//   setStatus({
//     type: 'success',
//     message: `Admission Finalized! ID: ${res.data.admissionNumber}`
//   });
//   setAdmissionId('');
// } else {
//   setStatus({ type: 'error', message: 'Finalization failed. Please check ID status.' });
// }
//     } catch (err) {
//       setStatus({
//         type: 'error',
//         message: err.response?.data?.error || 'Server error occurred.'
//       });
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={{ backgroundColor: '#ecfdf5', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
//           <ShieldCheckIcon style={{ width: '32px', color: '#10b981' }} />
//         </div>

//         <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
//           Final Confirmation
//         </h1>
//         <p style={{ color: '#64748b', fontSize: '15px' }}>
//           Enter the temporary Admission ID to convert it into a permanent enrollment.
//         </p>

//         {status.message && (
//           <div style={{
//             marginTop: '20px',
//             padding: '12px',
//             borderRadius: '8px',
//             fontSize: '14px',
//             fontWeight: '600',
//             backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
//             color: status.type === 'success' ? '#166534' : '#991b1b',
//             border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fecaca'}`
//           }}>
//             {status.message}
//           </div>
//         )}

//         <form onSubmit={handleConfirm}>
//           <div style={styles.inputWrapper}>
//             <HashtagIcon style={styles.icon} />
//             <input
//               style={styles.input}
//               placeholder="e.g. ADM-2024-001"
//               value={admissionId}
//               onChange={e => setAdmissionId(e.target.value)}
//               onFocus={(e) => e.target.style.borderColor = '#059669'}
//               onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             style={styles.button}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
//           >
//             <CheckCircleIcon style={{ width: '20px' }} />
//             Finalize Admission
//           </button>
//         </form>

//         <div style={styles.checklist}>
//           <p style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '12px', textTransform: 'uppercase' }}>
//             Pre-Confirmation Checklist
//           </p>
//           <div style={styles.checkItem}><CheckCircleIcon style={{ width: '14px', color: '#10b981' }} /> Original documents verified</div>
//           <div style={styles.checkItem}><CheckCircleIcon style={{ width: '14px', color: '#10b981' }} /> Full fee payment received</div>
//           <div style={styles.checkItem}><CheckCircleIcon style={{ width: '14px', color: '#10b981' }} /> Eligibility criteria met</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdmissionConfirmation;

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// function AdmissionConfirmation() {
//   const [admissions, setAdmissions] = useState([]);
//   const [status, setStatus] = useState({ type: '', message: '' });

// useEffect(() => {
//   api.get('/admission/list')
//     .then(res => setAdmissions(res.data))
//     .catch(err => console.error(err));
// }, []);

//   const handleConfirm = async (admissionNumber) => {
//     setStatus({ type: '', message: '' });
//     try {
//       const res = await api.post('/admission/confirm', { admissionId: admissionNumber });
//       if (res.data.confirmed) {
//         setStatus({ type: 'success', message: `Admission Finalized! ID: ${res.data.admissionNumber}` });
//         // Refresh list after confirmation
//         const updated = await api.get('/admission/list');
//         setAdmissions(updated.data);
//       } else {
//         setStatus({ type: 'error', message: 'Finalization failed. Please check ID status.' });
//       }
//     } catch (err) {
//       setStatus({ type: 'error', message: err.response?.data?.error || 'Server error occurred.' });
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
//       <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>
//         <ShieldCheckIcon style={{ width: '32px', color: '#10b981', marginRight: '10px' }} />
//         Final Confirmation
//       </h1>

//       {status.message && (
//         <div style={{
//           marginBottom: '20px',
//           padding: '12px',
//           borderRadius: '8px',
//           fontSize: '14px',
//           fontWeight: '600',
//           backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
//           color: status.type === 'success' ? '#166534' : '#991b1b',
//           border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fecaca'}`
//         }}>
//           {status.message}
//         </div>
//       )}

//       <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Allocated Admissions</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f1f5f9' }}>
//             <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Admission Number</th>
//             <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Applicant</th>
//             <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Fee Status</th>
//             <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admissions.map(adm => (
//             <tr key={adm._id}>
//   <td>{adm.admissionNumber}</td>
//   <td>{adm.applicantId?.name}</td>
//   <td>{adm.applicantId?.feeStatus}</td>
//   <td>
//     {adm.status === "Allocated" ? (
//       <button
//         onClick={() => handleConfirm(adm.admissionNumber)}
//         style={{
//           backgroundColor: "#059669",
//           color: "#fff",
//           padding: "8px 16px",
//           borderRadius: "8px",
//           border: "none",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           gap: "6px"
//         }}
//       >
//         <CheckCircleIcon style={{ width: "18px" }} /> Confirm
//       </button>
//     ) : (
//       <span style={{ color: "#166534", fontWeight: "600" }}>✔ Finalized</span>
//     )}
//   </td>
// </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdmissionConfirmation;

import React, { useState, useEffect } from "react";
import api from "../services/api";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  UserIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

function AdmissionConfirmation() {
  const [admissions, setAdmissions] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admission/list");
      setAdmissions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (admissionNumber) => {
    setStatus({ type: "", message: "" });
    try {
      const res = await api.post("/admission/confirm", {
        admissionId: admissionNumber,
      });
      if (res.data.confirmed) {
        setStatus({
          type: "success",
          message: `Admission Finalized! ID: ${res.data.admissionNumber}`,
        });
        await fetchAdmissions(); // Refresh the list
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Server error occurred.",
      });
    }
  };

  const styles = {
    container: { maxWidth: "1000px", margin: "0 auto", padding: "30px" },
    header: { marginBottom: "30px" },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      overflow: "hidden", // Keeps table corners rounded
    },
    table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
    th: {
      backgroundColor: "#f8fafc",
      padding: "16px",
      fontSize: "12px",
      fontWeight: "600",
      color: "#64748b",
      textTransform: "uppercase",
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "16px",
      fontSize: "14px",
      color: "#334155",
      borderBottom: "1px solid #f1f5f9",
    },
    badge: (type) => ({
      padding: "4px 10px",
      borderRadius: "99px",
      fontSize: "12px",
      fontWeight: "600",
      backgroundColor:
        type === "Paid" || type === "Finalized" ? "#f0fdf4" : "#fff7ed",
      color: type === "Paid" || type === "Finalized" ? "#16a34a" : "#c2410c",
      border: `1px solid ${type === "Paid" || type === "Finalized" ? "#bbf7d0" : "#ffedd5"}`,
    }),
    confirmBtn: {
      backgroundColor: "#059669",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "background 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <ShieldCheckIcon style={{ width: "32px", color: "#10b981" }} />
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Final Confirmation
          </h1>
        </div>
        <p style={{ color: "#64748b" }}>
          Review and finalize student admissions once fees and documents are
          verified.
        </p>
      </header>

      {status.message && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: status.type === "success" ? "#f0fdf4" : "#fef2f2",
            color: status.type === "success" ? "#166534" : "#991b1b",
            border: `1px solid ${status.type === "success" ? "#bbf7d0" : "#fecaca"}`,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {status.type === "success" ? (
            <CheckCircleIcon style={{ width: "20px" }} />
          ) : (
            <ClockIcon style={{ width: "20px" }} />
          )}
          {status.message}
        </div>
      )}

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Admission Detail</th>
              <th style={styles.th}>Applicant</th>
              <th style={styles.th}>Payment Status</th>
              <th style={styles.th}>Current Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  Loading admissions list...
                </td>
              </tr>
            ) : admissions.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No admissions pending confirmation.
                </td>
              </tr>
            ) : (
              admissions.map((adm) => (
                <tr key={adm._id} style={{ transition: "background 0.2s" }}>
                  <td style={styles.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <IdentificationIcon
                        style={{ width: "18px", color: "#94a3b8" }}
                      />
                      <strong>{adm.admissionNumber}</strong>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <UserIcon style={{ width: "18px", color: "#94a3b8" }} />
                      {adm.applicantId?.name || "N/A"}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge(adm.applicantId?.feeStatus)}>
                      {adm.applicantId?.feeStatus}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={styles.badge(
                        adm.status === "Confirmed" ? "Finalized" : "Allocated",
                      )}
                    >
                      {adm.status === "Confirmed" ? "Finalized" : "Allocated"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {adm.status !== "Confirmed" ? (
                      <button
                        onClick={() => handleConfirm(adm.admissionNumber)}
                        style={styles.confirmBtn}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#047857")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#059669")
                        }
                      >
                        <CheckCircleIcon style={{ width: "16px" }} /> Confirm
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#16a34a",
                          fontWeight: "600",
                        }}
                      >
                        <CheckCircleIcon style={{ width: "18px" }} /> Finalized
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmissionConfirmation;
