/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import accountService from "../Services/authServices";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		firstname: Yup.string().required("Phone number is required"),
		lastname: Yup.string().required("Phone number is required"),
		email: Yup.string().required("Email is required").email("Email is invalid"),
		// username: Yup.string().required("Username is required"),
		phone: Yup.number().required("Phone number is required"),
		pin: Yup.string().required("Phone number is required"),
		password: Yup.string().required("Phone number is required").min(8),
	});
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema) });
	const createAccount = async (data) => {
		data.role = "user";
		let response = await accountService.signup(data);


		setTimeout(() => {
			if (response.code === 200) {
				setMessage("Registration was successful");
				navigate("/");
			} else {
				setMessage(response.message);
			}
		}, 2000)
		
	};
	return (
		<div>
			<Container className="BuyData-main logout-main">
				<div className="BuyData-submain Form-submain">
					{message ? <div className="alert alert-info">{message}</div> : null}
					<Row className="logout-row">
						<Col sm={8} xs={{ order: "" }} className="BuyData-form BuyAirtime">
							<Form
								className="input-form"
								onSubmit={handleSubmit(createAccount)}>
								<div>
									<h1 className="">Supremedata</h1>
								</div>
								<Form.Group>
									<Form.Label className="label phone-label">
										Firstname
									</Form.Label>
									<input
										type="name"
										placeholder="fullmame"
										className="mb-3 form-control"
										{...register("firstname")}
										required
									/>
									<span>{errors.fullname?.message}</span>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">
										Lastname
									</Form.Label>
									<input
										type="name"
										placeholder="fullmame"
										className="mb-3 form-control"
										{...register("lastname")}
										required
									/>
									<span>{errors.fullname?.message}</span>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">Email</Form.Label>
									<input
										type="name"
										placeholder="Enter your email"
										className="mb-3 form-control"
										{...register("email")}
										required
									/>
									<span>{errors.email?.message}</span>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">Phone</Form.Label>
									<input
										type="name"
										placeholder="08000000000"
										className="mb-3 form-control"
										{...register("phone")}
										required
									/>
									<span>{errors.phone?.message}</span>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">
										Referral username [optional]
									</Form.Label>
									<input
										type="name"
										placeholder="supremedata"
										className="mb-3 form-control"
									/>
									<span>Leave blank if no referral</span>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label">Transaction Pin</Form.Label>
									<input
										type="password"
										className="mb-3 form-control"
										placeholder="(4 Digit) Transaction Pin"
										{...register("pin")}
										required
									/>
									<span>{errors.pin?.message}</span>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label">Password</Form.Label>
									<input
										type="password"
										className="mb-3 form-control"
										placeholder="Password"
										{...register("password")}
										required
									/>
									<span>{errors.password?.message}</span>
								</Form.Group>
								{/* <Form.Group> */}
								{/* <Form.Label className="label">Confirm Password</Form.Label> */}
								{/* <input
                    type="password"
                    className="mb-3 form-control"
                    {...register("password")}
                    required
                  /> */}
								{/* <span>Enter same password as before</span> */}
								{/* </Form.Group> */}
								{/* <Checkbox></Checkbox> */}
								<Button type="submit" value="Register" className="Buy-now-btn">
									Sign Up
								</Button>{" "}
								{/* <Input type="submit" class="btnRegister" value="Register" /> */}
								<div>
									Already a member? <Link to="/">Sign In</Link>
								</div>
							</Form>
						</Col>
						{/* <Col sm={4} xs={{ order: '' }}>sm=4</Col> */}
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default Signup;
