import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";

import { AuthContext } from "../../providers/AuthProvider";
import AuthWrapper from "../AuthWrapper";
import { AUTH_LAMBDA_URL } from "../../utility/constants";
import SecurityQnA from "../SecurityQnA";
import CeasarCipher from "../CeasarCipher";

const Login = () => {
  const { currentUser, setCurrentUser, authenticate } = useContext(AuthContext);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // get user's security question answer
  const getSecurityQnA = async (data) => {
    return await new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(AUTH_LAMBDA_URL, data);
        if (res.status === 200) {
          resolve(res);
        } else {
          reject();
        }
      } catch (err) {
        console.log("getSecurityQnA: ", err);
        reject(err);
      }
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (!email) {
      return setErrorMessage("Email address is required.");
    }
    if (!password) {
      return setErrorMessage("Password is required.");
    }
    setErrorMessage("");

    authenticate(email, password)
      .then(async (data) => {
        if (data) {
          try {
            const res = await getSecurityQnA({
              type: "get",
              userId: data.idToken.payload["custom:userId"],
            });
            setCurrentUser((prev) => ({
              ...prev,
              question: res.data.securityQuestion.S,
              answer: res.data.securityAnswer.S,
              ceasarKey: parseInt(res.data.ceasarKey.N),
            }));
          } catch (err) {
            console.log("getSecurityQnA: ", err);
            setErrorMessage(
              "Something went wrong, please try again after sometime."
            );
          }
        }
      })
      .catch((err) => setErrorMessage(err.message || JSON.stringify(err)));
  };

  const { email, password } = loginDetails;

  if (!!currentUser?.userQnAVerified) {
    return <CeasarCipher />;
  } else if (!!currentUser?.question) {
    return <SecurityQnA />;
  } else {
    return (
      <AuthWrapper title="Sign in">
        <Form className="auth-form" onSubmit={handleLoginClick}>
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <FormGroup>
            <Input
              id="email"
              name="email"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChange}
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
  }
};

export default Login;
