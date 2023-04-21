import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button } from 'react-bootstrap';

const ContactFormContainer = styled(Container)`
  background-color: #f8f9fa;
  padding: 100px;
  border-radius: 5px;
`;

const ContactForm = () => {
  return (
    <ContactFormContainer>
      <h2>Contact Us</h2>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </ContactFormContainer>
  );
};

export default ContactForm;
