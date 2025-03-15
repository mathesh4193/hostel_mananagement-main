import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import SignIn from './components/Auth/SignIn';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import About from './components/About/About';
import WardenDashboard from './components/Dashboard/WardenDashboard.jsx';  
import './components/About/About.css';  
import Leave from './components/Leave/Leave';
import Complaints from './components/Complaints/Complaints';
import Mess from './components/Mess/Mess';
import Room from './components/Room/Room';
import Security from './components/Security/Security';
import Dashboard from './components/Dashboard/Dashboard';
import Outpass from './components/Outpass/Outpass';
import Layout from './components/Layout/Layout';
import Attendance from './components/Attendance/Attendance.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/warden-dashboard" element={<WardenDashboard />} />
          <Route path="/student-dashboard/leave" element={<Leave />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/Attendance" element={<Attendance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
