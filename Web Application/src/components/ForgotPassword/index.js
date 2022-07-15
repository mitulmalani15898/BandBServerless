import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from "reactstrap";

import AuthWrapper from "../AuthWrapper";

const ForgotPassword = () => {
  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
  };

  return (
    <AuthWrapper title="Forgot Password">
      <Form className="auth-form" onSubmit={handleForgotPasswordClick}>
        <FormGroup>
          <Input
            id="email"
            name="email"
            placeholder="Email address"
            type="email"
          />
        </FormGroup>
        <Button color="primary" type="submit" className="auth-button">
          Send Verification Code
        </Button>
        <div className="auth-link-wrapper">
          <span></span>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </Form>
    </AuthWrapper>
  );
};

export default ForgotPassword;
