import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = ({ setAccount, handleClose }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/home");
      handleClose();
    } catch {
      setError("Failed to sign in");
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Sign in</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Email</Form.Label>
              <Form.Control
                type='email'
                autoComplete='username'
                placeholder='Email'
                required
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Password'
                required
                ref={passwordRef}
              />
            </Form.Group>
            <Button type='Submit' disabled={loading}>
              Sign in
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          Don't have an account?{" "}
          <span className='link' onClick={() => setAccount(false)}>
            Sign up
          </span>
        </Card.Body>
      </Card>
    </>
  );
};

export default SignIn;
