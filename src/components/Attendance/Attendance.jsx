import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';

// VCET Campus Coordinates
const VCET_COORDS = {
  latitude: 9.893802,
  longitude: 78.176232,
  radius: 500
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Attendance = () => {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isInCampus, setIsInCampus] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  
  const attendanceData = [
    { date: '2024-03-01', status: 'Present' },
    { date: '2024-03-02', status: 'Present' },
    { date: '2024-03-03', status: 'Absent' },
    { date: '2024-03-04', status: 'Present' },
  ];

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const calculatedDistance = getDistance(latitude, longitude, VCET_COORDS.latitude, VCET_COORDS.longitude);
        setDistance(Math.round(calculatedDistance));
        setIsInCampus(calculatedDistance <= VCET_COORDS.radius);
        
        if (calculatedDistance > VCET_COORDS.radius) {
          setError(`You are ${Math.round(calculatedDistance)}m away from VCET.`);
        } else {
          setError("");
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => setAddress(data.display_name || "Location not found"))
          .catch(() => setAddress("Failed to fetch address"));

        setLoading(false);
      },
      () => {
        setError("Location access denied. Please enable GPS.");
        setLoading(false);
      }
    );
  }, []);

  const markAttendance = () => {
    if (!isInCampus) {
      alert(`ABSENT\nYou are ${distance}m away from VCET.`);
      return;
    }
    alert(`PRESENT\nAttendance marked successfully!`);
  };

  const calculateAttendance = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(day => day.status === 'Present').length;
    return {
      total,
      present,
      percentage: ((present / total) * 100).toFixed(2)
    };
  };

  const stats = calculateAttendance();

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Attendance System</h2>

      {/* Current Status */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Current Status</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <p>Loading location data...</p>
          ) : (
            <>
              {error && <p className="text-danger">{error}</p>}
              {location && (
                <div>
                  <p>
                    <strong>Status: </strong>
                    <span className={isInCampus ? "text-success" : "text-danger"}>
                      {isInCampus ? "PRESENT ✅" : "ABSENT ❌"}
                    </span>
                  </p>
                  <p><strong>Your Location: </strong>{address || "Fetching address..."}</p>
                  <button 
                    className={`btn btn-${isInCampus ? 'success' : 'danger'} w-100`}
                    onClick={markAttendance}
                    disabled={!location || !!error}
                  >
                    Mark {isInCampus ? "Present" : "Absent"}
                  </button>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Attendance Statistics */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="bg-primary text-white">
            <Card.Body>
              <Card.Title>Total Days</Card.Title>
              <Card.Text className="h2">{stats.total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title>Present Days</Card.Title>
              <Card.Text className="h2">{stats.present}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-info text-white">
            <Card.Body>
              <Card.Title>Attendance Percentage</Card.Title>
              <Card.Text className="h2">{stats.percentage}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Attendance History */}
      <Card>
        <Card.Header className="bg-light">
          <Form.Group>
            <Form.Label>Select Month</Form.Label>
            <Form.Control
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </Form.Group>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((day, index) => (
                <tr key={index}>
                  <td>{day.date}</td>
                  <td>
                    <span className={`badge bg-${day.status === 'Present' ? 'success' : 'danger'}`}>
                      {day.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Attendance;
