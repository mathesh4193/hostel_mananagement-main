import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: 'John Doe', // Default values for testing
    registerNo: '12345',
    rollNo: '22CSEA44'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/students/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStudentInfo(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching student info:', error);
        setError('Failed to load student information');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchStudentInfo();
    }
  }, [userId]);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className="profile-section" sx={{ p: 3 }}>
            <div className="profile-header">
              <div className="profile-avatar">
                <PersonIcon sx={{ fontSize: 60, color: '#1976d2' }} />
              </div>
              <Typography variant="h4">{studentInfo.name}</Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="info-section" sx={{ p: 3 }}>
            <Typography variant="h6" className="section-title" sx={{ mb: 2 }}>
              <SchoolIcon sx={{ mr: 1 }} /> Academic Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Register No" 
                  secondary={studentInfo.registerNo} 
                  sx={{ my: 1 }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Roll No" 
                  secondary={studentInfo.rollNo} 
                  sx={{ my: 1 }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;