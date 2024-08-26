/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import accountServices from "../Services/authServices";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = (props) => {
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // State for password visibility
	const navigate = useNavigate();
	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string().required("Phone number is required").min(8),
	});
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema) });
	const login = async (data) => {
		setLoading(true);

		let result = await accountServices.login(data);
		if (result.body.loggedIn === true) {
			localStorage.setItem("token", result.body.access_token);
			// console.log("token", result.body.access_token);
			setMessage(result.message);
			navigate("/dashboard");
		} else {
			// console.log("result.message", result.body.error);
			setMessage(result.body.error);
		}

		setLoading(false);
	};

	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<Container className="BuyData-main logout-main">
				<div className="BuyData-submain Form-submain">
					<Row className="logout-row">
						<Col sm={8} xs={{ order: "" }} className="BuyData-form BuyAirtime">
							{!loading && (
								<Form className="input-form" onSubmit={handleSubmit(login)}>
									<div>
										<h1 className="">Supremedata</h1>
										{message ? (
											<div className="alert alert-info">{message}</div>
										) : null}
									</div>
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
									</Form.Group>
									<Form.Group>
										<Form.Label className="label">Password</Form.Label>
										<div className="input-group  flex justify-center">
											<input
												className=" form-control"
												type={showPassword ? "text" : "password"} // Toggle input type
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
									</Form.Group>
									<Button type="submit" className="Buy-now-btn">
										Login
									</Button>{" "}
									<div>
										Don't have an account yet ?{" "}
										<Link to="/Signup">Sign Up</Link>
									</div>
								</Form>
							)}
							{loading && (
								<div>
									{" "}
									<div className="spinner-border spinner-border-sm"></div>
									<div className="spinner-grow spinner-grow-sm"></div>{" "}
								</div>
							)}
						</Col>
						{/* <Col sm={4} xs={{ order: '' }}>sm=4</Col> */}
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default Login;
