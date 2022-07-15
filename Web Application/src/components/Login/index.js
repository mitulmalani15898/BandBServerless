import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from "reactstrap";

import AuthWrapper from "../AuthWrapper";

const Login = () => {
  const handleLoginClick = (e) => {
    e.preventDefault();
  };

  return (
    <AuthWrapper title="Sign in">
      <Form className="auth-form" onSubmit={handleLoginClick}>
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
          Sign in
        </Button>
        <div className="auth-link-wrapper">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
