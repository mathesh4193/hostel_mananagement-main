import React from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import './WardenDashboard.css';

const WardenDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Warden Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Paper className="dashboard-card">
            <Typography variant="h6">Hostel Overview</Typography>
            <Box className="card-content">
              <Typography>Total Rooms: 100</Typography>
              <Typography>Occupied: 75</Typography>
              <Typography>Available: 25</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="dashboard-card">
            <Typography variant="h6">Pending Approvals</Typography>
            <Box className="card-content">
              <Typography>Leave Requests: 10</Typography>
              <Typography>Outpass Requests: 5</Typography>
              <Typography>Room Changes: 3</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="dashboard-card">
            <Typography variant="h6">Fee Collection</Typography>
            <Box className="card-content">
              <Typography>Total Collected: ₹500,000</Typography>
              <Typography>Pending: ₹150,000</Typography>
              <Typography>Defaulters: 15</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} md={3}>
          <Button
            className="action-button"
            startIcon={<AssignmentIcon />}
            onClick={() => handleNavigation('/warden/leave-requests')}
          >
            Leave Requests
          </Button>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            className="action-button"
            startIcon={<ExitToAppIcon />}
            onClick={() => handleNavigation('/warden/outpass-requests')}
          >
            Outpass Requests
          </Button>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            className="action-button"
            startIcon={<ReportProblemIcon />}
            onClick={() => handleNavigation('/warden/complaints')}
          >
            Complaints
          </Button>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            className="action-button"
            startIcon={<PeopleIcon />}
            onClick={() => handleNavigation('/warden/student-management')}
          >
            Student Management
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WardenDashboard;