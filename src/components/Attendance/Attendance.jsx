import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';

// Move VCET_LOCATION outside the component
const VCET_LOCATION = {
  latitude: 13.015859,
  longitude: 80.179054,
  radius: 500
};

const Attendance = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
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
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Returns distance in meters
  };

  // Disable eslint warning for VCET_LOCATION dependencies since they are constants
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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

          const isWithinCampus = distance <= VCET_LOCATION.radius;
          setIsInCampus(isWithinCampus);
          setError(
            isWithinCampus
              ? ''
              : `You are ${Math.round(distance)}m away from VCET. Must be within ${VCET_LOCATION.radius}m of campus.`
          );
          setLoading(false);

          // Fetch the location address using OpenStreetMap (Nominatim API)
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLocation.latitude}&lon=${currentLocation.longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setAddress(data.display_name || 'Location not found');
            })
            .catch(() => setAddress('Failed to fetch address'));
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
  }, [
    VCET_LOCATION.latitude,
    VCET_LOCATION.longitude,
    VCET_LOCATION.radius
  ]);

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
      <Typography variant="h4" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Attendance Status
      </Typography>

      <Paper elevation={3} style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        {loading ? (
          <Typography variant="body1">Loading location data...</Typography>
        ) : (
          <>
            {error && (
              <Typography color="error" style={{ marginBottom: '1rem' }}>
                {error}
              </Typography>
            )}

            {location && (
              <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: isInCampus ? '#4caf50' : '#f44336',
                  }}
                >
                  Status: {isInCampus ? 'PRESENT' : 'ABSENT'}
                </span>
                <br />
                {isInCampus ? '✅ Location verified: Within VCET campus' : '❌ Not within VCET campus'}
                <br />
                <small><strong>Your location:</strong> {address || 'Fetching address...'}</small>
              </Typography>
            )}

            <Button
              variant="contained"
              color={isInCampus ? 'success' : 'error'}
              onClick={handleMarkAttendance}
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
