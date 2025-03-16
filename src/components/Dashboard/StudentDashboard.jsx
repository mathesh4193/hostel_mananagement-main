import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReportIcon from '@mui/icons-material/Report';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SecurityIcon from '@mui/icons-material/Security';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Dashboard.css';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Outlet } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const studentName = localStorage.getItem('userName');
  const isLoggedIn = !!studentName;
  
  const sidebarItems = [
    { title: 'Leave Application', icon: <AssignmentIcon />, path: '/student-dashboard/leave' },
    { title: 'Attendance', icon: <EventNoteIcon />, path: '/attendance' },
    { title: 'Complaints', icon: <ReportIcon />, path: '/complaints' },
    { title: 'Room Details', icon: <MeetingRoomIcon />, path: '/room' },
    { title: 'Mess Schedule', icon: <RestaurantMenuIcon />, path: '/mess' },
    { title: 'Security', icon: <SecurityIcon />, path: '/security' },
    { title: 'Outpass', icon: <ExitToAppIcon />, path: '/outpass' },
    ...(isLoggedIn ? [{ title: 'Profile', icon: <AccountCircleIcon />, path: '/profile' }] : []),
  ];
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const studentInfo = {
    name: 'Mathesh M',
    registerNo: '913122104084',
    rollNo: '22CSE44',
    section: 'A',
    email: 'mathesh4193@gmail.com',
    phone: '63838-65710',
    mentor: 'Dr. S. Kavitha',
    classIncharge: 'Mrs.S. Padmadevi'
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: open ? '240px' : '65px',
          top: '10px',
          zIndex: 1200,
          backgroundColor: '#1a2035',
          color: 'white',
          '&:hover': {
            backgroundColor: '#2a3446',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 65,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 65,
            boxSizing: 'border-box',
            backgroundColor: '#1a2035',
            color: 'white',
            overflowX: 'hidden',
            transition: 'width 0.3s'
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <img src="/Vcet_logo.jpg" alt="VCET Logo" style={{ height: '40px' }} />
          {open && (
            <Typography variant="h6" sx={{ mt: 1 }}>
              VCET Hostel
            </Typography>
          )}
        </Box>
        <List>
          {sidebarItems.map((item) => (
            <ListItem 
              button 
              key={item.title}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: '#4dabf5',
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        ml: open ? '240px' : '65px',
        transition: 'margin-left 0.3s'
      }}>
        {/* Student Profile Section */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#1a2035', color: 'white' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <AccountCircleIcon sx={{ fontSize: 100, color: '#4dabf5' }} />
                <Typography variant="h5" sx={{ mt: 2 }}>{studentInfo.name}</Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2, bgcolor: '#4dabf5' }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Register No</Typography>
                  <Typography>{studentInfo.registerNo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Roll No</Typography>
                  <Typography>{studentInfo.rollNo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Section</Typography>
                  <Typography>{studentInfo.section}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Email</Typography>
                  <Typography>{studentInfo.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Phone</Typography>
                  <Typography>{studentInfo.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Mentor</Typography>
                  <Typography>{studentInfo.mentor}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="#4dabf5">Class Incharge</Typography>
                  <Typography>{studentInfo.classIncharge}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Add Outlet for nested routes */}
        <Outlet />

        {/* Dashboard Cards Grid */}
        <Grid container spacing={3} className="dashboard-grid">
          {/* Dashboard cards content remains the same */}
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentDashboard;