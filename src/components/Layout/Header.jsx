import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInCampus, setIsInCampus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  // Function to check if user is in VCET campus (13.0159° N, 80.1791° E)
  const checkLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const vcetLat = 13.0159;
          const vcetLng = 80.1791;
          const radius = 0.5; // 500 meters radius

          const distance = getDistance(
            position.coords.latitude,
            position.coords.longitude,
            vcetLat,
            vcetLng
          );
          setIsInCampus(distance <= radius);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    }
  };

  // Function to calculate distance between two coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    checkLocation();
    const intervalId = setInterval(checkLocation, 60000); // Check every minute
    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  // Hide header on dashboard pages
  if (location.pathname.includes('dashboard')) return null;

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToTop: true } });
    }
    setIsMenuOpen(false);
  };

  return (
    <AppBar position="fixed" className="header">
      <Toolbar>
        <Box className="logo-container" sx={{ height: '40px' }}>
          <img src="/Vcet_logo.jpg" alt="VCET Logo" className="logo" style={{ height: '35px' }} />
          <Typography variant="subtitle1" className="title" sx={{ fontSize: '1rem' }}>
            VCET Hostel
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Button color="inherit" onClick={handleHomeClick} component={Link} to="/">
            Home
          </Button>
          {userName ? (
            <>
              {isInCampus && (
                <Button color="inherit" component={Link} to="/attendance">
                  Attendance
                </Button>
              )}
              <Button color="inherit" component={Link} to="/complaints" onClick={() => setIsMenuOpen(false)}>
                Complaints
              </Button>
              <Button color="inherit" component={Link} to="/outpass" startIcon={<AccessTimeIcon />} onClick={() => setIsMenuOpen(false)}>
                Outpass
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem('userName');
                  navigate('/');
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;