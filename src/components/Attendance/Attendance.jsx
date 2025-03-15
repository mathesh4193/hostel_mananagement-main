import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import './Attendance.css';

const Attendance = () => {
  const [location, setLocation] = useState(null);
  const [isInCampus, setIsInCampus] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // VCET coordinates
  const VCET_LOCATION = {
    latitude: 9.882275,  // Updated VCET latitude
    longitude: 78.081789, // Updated VCET longitude
    radius: 100 // 100 meters radius for campus coverage
  };

  // Haversine Formula to calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  useEffect(() => {
    console.log("Attendance component mounted");
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got position:", position.coords);
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(currentLocation);

          const distance = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            VCET_LOCATION.latitude,
            VCET_LOCATION.longitude
          );

          console.log("Distance from VCET:", distance, "meters"); // Add this for debugging
          setIsInCampus(distance <= VCET_LOCATION.radius);
          setError(distance > VCET_LOCATION.radius ? `You are ${Math.round(distance)}m away from campus. Must be within ${VCET_LOCATION.radius}m.` : '');
          setLoading(false);
        },
        (err) => {
          console.error('Geolocation Error:', err.message);
          setError('Location access denied. Please enable GPS.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  const handleMarkAttendance = () => {
    if (!isInCampus) {
      alert('ABSENT: You are not within the VCET campus boundary.');
      return;
    }
    const now = new Date();
    const timestamp = now.toLocaleString();
    alert(`PRESENT\nAttendance marked successfully!\nTime: ${timestamp}`);
  };

  return (
    <Container className="attendance-container" style={{ marginTop: '2rem', minHeight: '80vh' }}>
      <Typography variant="h4" className="attendance-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Attendance Status
      </Typography>

      <Paper elevation={3} className="attendance-content" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        {loading ? (
          <Typography variant="body1">Loading location data...</Typography>
        ) : (
          <>
            {error && (
              <Typography color="error" className="error-message" style={{ marginBottom: '1rem' }}>
                {error}
              </Typography>
            )}

            {location && (
              <Typography variant="body1" className="location-info" style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                  color: isInCampus ? '#4caf50' : '#f44336'
                }}>
                  Status: {isInCampus ? 'PRESENT' : 'ABSENT'}
                </span>
                <br />
                {isInCampus ? '✅ Location verified: Within VCET campus' : '❌ Not within VCET campus'}
                <br />
                <small>Your coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</small>
              </Typography>
            )}

            <Button
              variant="contained"
              color={isInCampus ? "success" : "error"}
              onClick={handleMarkAttendance}
              className="mark-button"
              disabled={!!error || !location}
              style={{ width: '100%', padding: '0.75rem', marginTop: '1rem' }}
            >
              Mark {isInCampus ? 'Present' : 'Absent'}
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Attendance;
