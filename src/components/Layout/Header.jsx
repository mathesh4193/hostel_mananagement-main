import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userName');

  // Hide header on dashboard pages
  const isDashboardPage = location.pathname.includes('dashboard');
  if (isDashboardPage) return null;

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
          <Button 
            color="inherit" 
            onClick={handleHomeClick}
            component={Link} 
            to="/"
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/attendance"
          >
            Attendance
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/complaints"  // Changed from "/complaint" to "/complaints"
            onClick={() => setIsMenuOpen(false)}
          >
            Complaints
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/outpass"
            startIcon={<AccessTimeIcon />}
            onClick={() => setIsMenuOpen(false)}
          >
            Outpass
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
          >
            Sign In
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;