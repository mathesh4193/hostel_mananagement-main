import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import './Mess.css';

const Mess = () => {
  const [menu, setMenu] = useState({
    breakfast: '',
    lunch: '',
    snacks: '',
    dinner: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editMenu, setEditMenu] = useState({ ...menu });
  const isWarden = localStorage.getItem('role') === 'warden';

  useEffect(() => {
    fetchTodayMenu();
  }, []);

  const fetchTodayMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mess/today');
      const data = await response.json();
      if (data.success) {
        setMenu(data.menu);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleUpdateMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mess/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editMenu)
      });
      const data = await response.json();
      if (data.success) {
        setMenu(editMenu);
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  return (
    <Container className="mess-container">
      <Typography variant="h4" className="mess-title">Today's Mess Menu</Typography>
      
      {isWarden && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenDialog(true)}
          className="update-button"
        >
          Update Menu
        </Button>
      )}

      <Grid container spacing={3} className="menu-grid">
        {Object.entries(menu).map(([meal, items]) => (
          <Grid item xs={12} md={6} key={meal}>
            <Paper className="menu-card">
              <Typography variant="h6" className="meal-title">
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </Typography>
              <Typography variant="body1">{items || 'Menu not updated'}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {isWarden && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Update Today's Menu</DialogTitle>
          <DialogContent>
            {Object.keys(editMenu).map((meal) => (
              <TextField
                key={meal}
                label={meal.charAt(0).toUpperCase() + meal.slice(1)}
                fullWidth
                multiline
                rows={2}
                value={editMenu[meal]}
                onChange={(e) => setEditMenu({ ...editMenu, [meal]: e.target.value })}
                margin="normal"
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateMenu} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Mess;