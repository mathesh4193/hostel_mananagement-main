import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './Leave.css';

const Leave = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [leaveData, setLeaveData] = useState({
    startDate: null,
    endDate: null,
    leaveType: '',  // Changed from 'singleDay' to empty string
    halfDayOption: '', // Changed from 'forenoon' to empty string
    reason: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveData.leaveType || !leaveData.halfDayOption) {
      setSnackbar({
        open: true,
        message: 'Please select leave type and half day option',
        severity: 'error'
      });
      return;
    }
    setSnackbar({
      open: true,
      message: 'Leave request submitted successfully!',
      severity: 'success'
    });
  };

  return (
    <Container className="leave-container" maxWidth="lg">
      <Typography variant={isMobile ? "h5" : "h4"} className="leave-title" gutterBottom>
        Leave Request Form
      </Typography>

      <Paper elevation={isMobile ? 2 : 3} className="leave-form-paper">
        <Box component="form" onSubmit={handleSubmit} sx={{ p: isMobile ? 2 : 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2, 
              mb: 3 
            }}>
              <DatePicker
                label="Start Date"
                value={leaveData.startDate}
                onChange={(date) => setLeaveData({ ...leaveData, startDate: date })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    size: isMobile ? "small" : "medium"
                  }
                }}
              />
              <DatePicker
                label="End Date"
                value={leaveData.endDate}
                onChange={(date) => setLeaveData({ ...leaveData, endDate: date })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    size: isMobile ? "small" : "medium"
                  }
                }}
              />
            </Box>
          </LocalizationProvider>

          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <FormLabel>Leave Duration</FormLabel>
            <RadioGroup
              value={leaveData.leaveType}
              onChange={(e) => setLeaveData({ ...leaveData, leaveType: e.target.value })}
              sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}
            >
              <FormControlLabel 
                value="singleDay" 
                control={
                  <Radio 
                    size={isMobile ? "small" : "medium"}
                    required
                  />
                } 
                label="Single Day Leave" 
              />
              <FormControlLabel 
                value="medical" 
                control={
                  <Radio 
                    size={isMobile ? "small" : "medium"}
                    required
                  />
                } 
                label="Medical Leave" 
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <FormLabel>Half Day Options</FormLabel>
            <RadioGroup
              value={leaveData.halfDayOption}
              onChange={(e) => setLeaveData({ ...leaveData, halfDayOption: e.target.value })}
              sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}
            >
              <FormControlLabel 
                value="forenoon" 
                control={
                  <Radio 
                    size={isMobile ? "small" : "medium"}
                    required
                  />
                } 
                label="Forenoon" 
              />
              <FormControlLabel 
                value="afternoon" 
                control={
                  <Radio 
                    size={isMobile ? "small" : "medium"}
                    required
                  />
                } 
                label="Afternoon" 
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Reason for Leave"
            multiline
            rows={isMobile ? 3 : 4}
            fullWidth
            required
            size={isMobile ? "small" : "medium"}
            value={leaveData.reason}
            onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
            sx={{ mb: 3 }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            size={isMobile ? "medium" : "large"} 
            className="submit-button" 
            fullWidth
          >
            Request Leave
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Leave;
