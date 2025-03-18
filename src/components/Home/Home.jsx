// Remove useLocation from imports
import React, { useRef } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Home.css';
// Remove unused useLocation import
// import { useLocation } from 'react-router-dom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Home = () => {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const heroRef = useRef(null);
  // Remove: const location = useLocation();

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeatureClick = (feature) => {
    const isLoggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    // List of features that don't require login
    const publicFeatures = ['about', 'complaint', 'attendance'];
    
    // Features restricted to wardens only
    if (feature === 'mess' && userRole !== 'warden') {
      alert('Mess menu can only be accessed by wardens');
      return;
    }

    // Check if login is required for this feature
    if (!isLoggedIn && !publicFeatures.includes(feature)) {
      navigate('/login', { state: { from: feature } });
      return;
    }

    const navigationPaths = {
      about: '/about',
      leave: '/student-dashboard/leave',
      complaint: '/complaints',
      mess: '/student-dashboard/mess',
      room: '/student-dashboard/room',
      security: '/student-dashboard/security',
      dashboard: '/student-dashboard',
      outpass: '/outpass',  // Update this path to match App.js route
      attendance: '/attendance'  // Updated path for attendance
    };

    if (navigationPaths[feature]) {
      navigate(navigationPaths[feature]);
    }
  };

  return (
    <Container className="home-container">
      <Box className="hero-section" ref={heroRef}>
        <Typography variant="h2">
          VCET Hostel 
        </Typography>
        <Typography variant="h5">
          Managing Student Accommodation with Excellence
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>
      </Box>

      <Box className="features-section" ref={featuresRef}>
        <Typography variant="h3">Features</Typography>
        <div className="features-grid">
          
          <div className="feature-card" onClick={() => handleFeatureClick('about')}>
            <AssignmentIcon className="feature-icon" />
            <Typography variant="h6">About Us</Typography>
            <Typography>Learn more about our hostel</Typography>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('leave')}>
            <AssignmentIcon className="feature-icon" />
            <Typography variant="h6">Leave Management</Typography>
            <Typography>Easy leave application process</Typography>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('complaint')}>
            <ReportProblemIcon className="feature-icon" />
            <Typography variant="h6">Complaints</Typography>
            <Typography>Submit and track complaints</Typography>
          </div>
          
          <div className="feature-card" onClick={() => handleFeatureClick('mess')}>
            <RestaurantMenuIcon className="feature-icon" />
            <Typography variant="h6">Mess Menu</Typography>
            <Typography>View daily menu</Typography>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('room')}>
            <MeetingRoomIcon className="feature-icon" />
            <Typography variant="h6">Room Allocation</Typography>
            <Typography>Room details and requests</Typography>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('security')}>
            <SecurityIcon className="feature-icon" />
            <Typography variant="h6">Security</Typography>
            <Typography>Campus security information</Typography>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('dashboard')}>
            <DashboardIcon className="feature-icon" />
            <Typography variant="h6">Dashboard</Typography>
            <Typography>Access your dashboard</Typography>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('outpass')}>
            <ExitToAppIcon className="feature-icon" />
            <Typography variant="h6">Out Pass</Typography>
            <Typography>Request out pass</Typography>
          </div>
          
          {/* Add this new feature card */}
          <div className="feature-card" onClick={() => handleFeatureClick('attendance')}>
            <EventAvailableIcon className="feature-icon" />
            <Typography variant="h6">Attendance</Typography>
            <Typography>Track daily attendance</Typography>
          </div>
          <div className=''>
            
          </div>
          {/* Add more feature cards as needed */}

        </div>
      </Box>
    </Container>
  );
}

export default Home;
