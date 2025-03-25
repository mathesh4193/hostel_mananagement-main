import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

const OutpassForm = () => {
  const [outpass, setOutpass] = useState({
    destination: '',
    purpose: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    contactNumber: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Outpass Request Form</h4>
        </Card.Header>
        <Card.Body>
          {submitted ? (
            <Alert variant="success">
              Your outpass request has been submitted successfully!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  value={outpass.destination}
                  onChange={(e) => setOutpass({...outpass, destination: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                  type="text"
                  value={outpass.purpose}
                  onChange={(e) => setOutpass({...outpass, purpose: e.target.value})}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Departure Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={outpass.departureDate}
                      onChange={(e) => setOutpass({...outpass, departureDate: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={outpass.departureTime}
                      onChange={(e) => setOutpass({...outpass, departureTime: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Return Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={outpass.returnDate}
                      onChange={(e) => setOutpass({...outpass, returnDate: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Return Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={outpass.returnTime}
                      onChange={(e) => setOutpass({...outpass, returnTime: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={outpass.contactNumber}
                  onChange={(e) => setOutpass({...outpass, contactNumber: e.target.value})}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Submit Request
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OutpassForm;
