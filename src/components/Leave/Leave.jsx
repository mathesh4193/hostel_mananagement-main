import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const Leave = () => {
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    halfDayOption: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveData.leaveType || !leaveData.halfDayOption) {
      alert('Please select leave type and half day option');
      return;
    }
    setSubmitted(true);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Leave Request Form</h2>

      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Submit Leave Application</h5>
        </Card.Header>
        <Card.Body>
          {submitted ? (
            <Alert variant="success">
              Your leave request has been submitted successfully!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={leaveData.startDate}
                      onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={leaveData.endDate}
                      onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Leave Duration</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Single Day Leave"
                    name="leaveType"
                    value="singleDay"
                    checked={leaveData.leaveType === 'singleDay'}
                    onChange={(e) => setLeaveData({ ...leaveData, leaveType: e.target.value })}
                    required
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Multiple Day Leave"
                    name="leaveType"
                    value="multiDay"
                    checked={leaveData.leaveType === 'multiDay'}
                    onChange={(e) => setLeaveData({ ...leaveData, leaveType: e.target.value })}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Half Day Option</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Forenoon"
                    name="halfDayOption"
                    value="forenoon"
                    checked={leaveData.halfDayOption === 'forenoon'}
                    onChange={(e) => setLeaveData({ ...leaveData, halfDayOption: e.target.value })}
                    required
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Afternoon"
                    name="halfDayOption"
                    value="afternoon"
                    checked={leaveData.halfDayOption === 'afternoon'}
                    onChange={(e) => setLeaveData({ ...leaveData, halfDayOption: e.target.value })}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Reason for Leave</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={leaveData.reason}
                  onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Submit Leave Request
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leave;
