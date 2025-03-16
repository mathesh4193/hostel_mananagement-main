import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout and Components
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import SignIn from './components/Auth/SignIn';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import WardenDashboard from './components/Dashboard/WardenDashboard';
import About from './components/About/About';
import Leave from './components/Leave/Leave';
import Complaints from './components/Complaints/Complaints';
import OutpassForm from './components/Outpass/OutpassForm';
import Attendance from './components/Attendance/Attendance.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/attendance" element={<Attendance />} />

          {/* Student Dashboard Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-dashboard/leave" element={<Leave />} />
          
          {/* Warden Dashboard */}
          <Route path="/warden-dashboard" element={<WardenDashboard />} />

          {/* OutpassForm Routes */}
          <Route path="/student-dashboard/outpass" element={<OutpassForm />} />
          <Route path="/outpass" element={<OutpassForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
