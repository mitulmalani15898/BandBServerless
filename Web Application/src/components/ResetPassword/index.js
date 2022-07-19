import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from "reactstrap";

import AuthWrapper from "../AuthWrapper";

const ResetPassword = () => {
  const handleResetPasswordClick = (e) => {
    e.preventDefault();
  };

  return (
    <AuthWrapper title="Reset Password">
      <Form className="auth-form" onSubmit={handleResetPasswordClick}>
        <FormGroup>
          <Input
            id="code"
            name="code"
            placeholder="Verification code"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="password"
            name="password"
            placeholder="New password"
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            type="password"
          />
        </FormGroup>
        <Button color="dark" type="submit" className="auth-button">
          Reset Password
        </Button>
        <div className="auth-link-wrapper">
          <span></span>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </Form>
    </AuthWrapper>
  );
};

export default ResetPassword;
