/** @format */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import accountServices from "../Services/authServices";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Spinner from "react-bootstrap/Spinner"; // Import Spinner

const Login = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string().required("Password is required").min(8),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const login = async (data) => {
    setLoading(true);
    setMessage(null); // Clear previous messages

    try {
      let result = await accountServices.login(data);
      console.log("login result", result);

      if (result.body.loggedIn) {
        localStorage.setItem("token", result.body.access_token);
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
          // window.location.reload();
        }, 2000);
      } else {
        setMessage(result.body.error);
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Container className="BuyData-main logout-main">
        <div className="BuyData-submain Form-submain">
          <Row className="logout-row">
            <Col sm={8} className="BuyData-form BuyAirtime">
              <Form className="input-form" onSubmit={handleSubmit(login)}>
                <h1 className="">Supremedata</h1>
                {message && <div className="alert alert-info">{message}</div>}

                <Form.Group>
                  <Form.Label className="label phone-label">
                    Username
                  </Form.Label>
                  <input
                    type="email"
                    name="username"
                    className="mb-3 form-control"
                    placeholder="Enter Username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="error">{errors.username.message}</p>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Password</Form.Label>
                  <div className="input-group flex justify-center">
                    <input
                      className="form-control"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      {...register("password")}
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="Buy-now-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Processing...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div>
                  Don't have an account yet? <Link to="/Signup">Sign Up</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Login;
