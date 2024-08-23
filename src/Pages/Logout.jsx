/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function Logout() {
	return (
		<div>
			<Container className="BuyData-main logout-main">
				<div className="BuyData-submain Form-submain">
					<Row className="logout-row">
						<Col sm={8} xs={{ order: "" }} className="BuyData-form BuyAirtime">
							<Form className="input-form">
								<div>
									<h1 className="">Supremedata</h1>
								</div>
								<Form.Group>
									<Form.Label className="label phone-label">
										Username
									</Form.Label>
									<Form.Control
										type="name"
										placeholder="supremedata"
										className="mb-3"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label">Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="........"
										className="mb-3"
									/>
								</Form.Group>
								{/* <link to='/Logout'>Forgot Password ?</link> */}
								<Link to="/Dashboard">
									<Button className="Buy-now-btn">Login</Button>{" "}
								</Link>
								{/* <div>Don't have an account yet ?<link to='/Logout'>Sign Up</link></div> */}
							</Form>
						</Col>
						{/* <Col sm={4} xs={{ order: '' }}>sm=4</Col> */}
					</Row>
				</div>
			</Container>
		</div>
	);
}

export default Logout;
