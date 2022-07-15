import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button, Row, Col } from "reactstrap";

import AuthWrapper from "../AuthWrapper";

const Signup = () => {
  const handleSignupClick = (e) => {
    e.preventDefault();
  };

  return (
    <AuthWrapper title="Sign up">
      <Form className="auth-form" onSubmit={handleSignupClick}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            id="email"
            name="email"
            placeholder="Email address"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />
        </FormGroup>
        <Button color="primary" type="submit" className="auth-button">
          Sign up
        </Button>
        <div className="auth-link-wrapper">
          <span></span>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </Form>
    </AuthWrapper>
  );
};

export default Signup;
