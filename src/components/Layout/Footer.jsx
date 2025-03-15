import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img src="/Vcet_logo.jpg" alt="VCET Logo" className="footer-logo" />
            <Typography variant="h6">VCET Hostel </Typography>
            <Typography variant="body2">
              Velammal College of Engineering and Technology - Madurai<br />
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Quick Links</Typography>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="https://vcet.ac.in/vcetit/hostel.html" target="_top">VCET HOSTEL</a></li>
            </ul>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Contact Information</Typography>
            <Typography variant="body2">
              Velammal Nagar Viraganoor - Madurai 625009<br />
              <a href="mailto:principal@vcet.ac.in">principal@vcet.ac.in</a><br />
              <a href="tel:9994994991"> 99949-94991</a><br />
              <a href="https://www.vcet.ac.in" target="_top" rel="noopener noreferrer">
                www.vcet.ac.in
              </a>
            </Typography>
          </Grid>
        </Grid>
        
        <Box className="footer-bottom">
          <Typography variant="body2">
            © 2025 VCET Hostel Connect. All rights reserved.
          </Typography>
          <Typography variant="body2">
            Designed and Developed by MATHESH.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;