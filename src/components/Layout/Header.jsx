import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        <Box className="logo-container">
          <img src="/Vcet_logo.jpg" alt="VCET Logo" className="logo" />
          <Typography variant="h6" className="title">
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
            to="/complaint"  // Updated from "/complaints" to "/complaint"
          >
            Complaints
          </Button>
          <Button color="inherit" component={Link} to="/login">Sign In</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;