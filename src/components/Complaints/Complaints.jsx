import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

const Complaints = () => {
  const [complaint, setComplaint] = useState({
    category: '',
    subject: '',
    description: '',
    roomNumber: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    setSubmitted(true);
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Submit a Complaint</h4>
        </Card.Header>
        <Card.Body>
          {submitted ? (
            <Alert variant="success">
              Your complaint has been submitted successfully!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={complaint.category}
                      onChange={(e) => setComplaint({...complaint, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="cleanliness">Cleanliness</option>
                      <option value="facilities">Facilities</option>
                      <option value="others">Others</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={complaint.roomNumber}
                      onChange={(e) => setComplaint({...complaint, roomNumber: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={complaint.subject}
                  onChange={(e) => setComplaint({...complaint, subject: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={complaint.description}
                  onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Submit Complaint
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">My Previous Complaints</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted">No previous complaints found.</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Complaints;
