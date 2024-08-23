/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
// import { Link } from 'react-router-dom';

function Settings() {
	return (
		<div>
			<Header />
			<Sidebar />
			<Container className="BuyData-main">
				<div className="BuyData-submain Form-submain">
					<Row>
						<Col sm={8} xs={{ order: "" }} className="BuyData-form BuyAirtime">
							<Form className="input-form">
								<Form.Label className="label">Bank Name</Form.Label>
								<Form.Select
									aria-label="Default select example"
									className="mb-3">
									<option></option>
									<option value="1">Access Bank</option>
									<option value="2">Gtbank</option>
									<option value="3">Zenith Bank</option>
									<option value="4">Other Banks...</option>
								</Form.Select>
								<Form.Group>
									<Form.Label className="label phone-label">
										Account Name
									</Form.Label>
									<Form.Control
										type="name"
										placeholder="Sodiq"
										className="mb-3"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">
										Account Number
									</Form.Label>
									<Form.Control
										type="phone-number"
										placeholder="0160157649"
										className="mb-3"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">
										Password
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="No password set."
										className="mb-3"
									/>
								</Form.Group>
								<p className="mb-3 plan-note">
									Raw passwords are not stored, so there is no way to see this
									user’s password, but you can change the password using this
									form.
								</p>
								{/* <link to='/Settings' className='mb-3 plan-note'>Change Password</link> */}
								<Button className="Buy-now-btn">Proceed</Button>{" "}
							</Form>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
	);
}

export default Settings;
