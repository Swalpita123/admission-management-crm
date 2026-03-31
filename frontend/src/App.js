// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import MasterSetup from './components/MasterSetup';
// import ApplicantForm from './components/ApplicantForm';
// import SeatAllocation from './components/SeatAllocation';
// import AdmissionConfirmation from './components/AdmissionConfirmation';
// import Dashboard from './components/Dashboard';

// function App() {
//   return (
//     <BrowserRouter>
//       <nav style={{ margin: '10px' }}>
//         <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
//         <Link to="/master" style={{ marginRight: '10px' }}>Master Setup</Link>
//         <Link to="/applicant" style={{ marginRight: '10px' }}>Applicant Form</Link>
//         <Link to="/allocate" style={{ marginRight: '10px' }}>Seat Allocation</Link>
//         <Link to="/confirm">Admission Confirmation</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/master" element={<MasterSetup />} />
//         <Route path="/applicant" element={<ApplicantForm />} />
//         <Route path="/allocate" element={<SeatAllocation />} />
//         <Route path="/confirm" element={<AdmissionConfirmation />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import MasterSetup from './components/MasterSetup';
import ApplicantForm from './components/ApplicantForm';
import SeatAllocation from './components/SeatAllocation';
import AdmissionConfirmation from './components/AdmissionConfirmation';
import Dashboard from './components/Dashboard';

function App() {
  const sidebarWidth = '260px'; // Define once for consistency

  const styles = {
    layout: {
      display: 'flex',
      flexDirection: 'row', // Side-by-side
      minHeight: '100vh',
      width: '100%'
    },
    sidebar: {
      width: sidebarWidth,
      height: '100vh',
      position: 'fixed', // Stays put
      top: 0,
      left: 0,
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      zIndex: 100, // Stays on top
      padding: '20px'
    },
    mainContent: {
      // THIS IS THE KEY FIX:
      marginLeft: sidebarWidth, 
      flexGrow: 1,
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px',
      boxSizing: 'border-box'
    },
    navLink: ({ isActive }) => ({
      display: 'block',
      padding: '12px',
      marginBottom: '5px',
      textDecoration: 'none',
      borderRadius: '8px',
      color: isActive ? '#0284c7' : '#64748b',
      backgroundColor: isActive ? '#f0f9ff' : 'transparent',
      fontWeight: isActive ? '600' : '400'
    })
  };

  return (
    <BrowserRouter>
      <div style={styles.layout}>
        {/* Sidebar */}
        <nav style={styles.sidebar}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '30px', color: '#0f172a' }}>
            Admin Panel
          </div>
          <NavLink to="/dashboard" style={styles.navLink}>Dashboard</NavLink>
          <NavLink to="/master" style={styles.navLink}>Master Setup</NavLink>
          <NavLink to="/applicant" style={styles.navLink}>Applicant Form</NavLink>
          <NavLink to="/allocate" style={styles.navLink}>Seat Allocation</NavLink>
          <NavLink to="/confirm" style={styles.navLink}>Confirmation</NavLink>
        </nav>

        {/* Main Content Area */}
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/master" element={<MasterSetup />} />
            <Route path="/applicant" element={<ApplicantForm />} />
            <Route path="/allocate" element={<SeatAllocation />} />
            <Route path="/confirm" element={<AdmissionConfirmation />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;