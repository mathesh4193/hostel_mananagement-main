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
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './Leave.css';

const Leave = () => {
  const [leaveData, setLeaveData] = useState({
    startDate: null,
    endDate: null,
    leaveType: 'singleDay',
    halfDayOption: 'forenoon',
    reason: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setSnackbar({
      open: true,
      message: 'Leave request submitted successfully!',
      severity: 'success'
    });
  };

  return (
    <Container className="leave-container">
      <Typography variant="h4" className="leave-title" gutterBottom>
        Leave Request Form
      </Typography>

      <Paper elevation={3} className="leave-form-paper">
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <DatePicker
                label="Start Date"
                value={leaveData.startDate}
                onChange={(date) => setLeaveData({ ...leaveData, startDate: date })}
                renderInput={(params) => <TextField {...params} required fullWidth />}
              />
              <DatePicker
                label="End Date"
                value={leaveData.endDate}
                onChange={(date) => setLeaveData({ ...leaveData, endDate: date })}
                renderInput={(params) => <TextField {...params} required fullWidth />}
              />
            </Box>
          </LocalizationProvider>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel>Leave Duration</FormLabel>
            <RadioGroup
              value={leaveData.leaveType}
              onChange={(e) => setLeaveData({ ...leaveData, leaveType: e.target.value })}
            >
              <FormControlLabel value="singleDay" control={<Radio />} label="Single Day Leave" />
              <FormControlLabel value="medical" control={<Radio />} label="Medical Leave" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel>Half Day Options</FormLabel>
            <RadioGroup
              value={leaveData.halfDayOption}
              onChange={(e) => setLeaveData({ ...leaveData, halfDayOption: e.target.value })}
            >
              <FormControlLabel value="forenoon" control={<Radio />} label="Forenoon" />
              <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Reason for Leave"
            multiline
            rows={4}
            fullWidth
            required
            value={leaveData.reason}
            onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
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
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Leave;