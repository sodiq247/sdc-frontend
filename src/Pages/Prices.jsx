/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function Prices() {
	return (
		<div>
			<Header />
			<Sidebar />
			<Container className="BuyData-main">
				<div className="BuyData-submain Price pricing">
					Pricing
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Prices</th>
								<th>Percentages</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>MTN AIRTIME</td>
								<td>% 97.0</td>
							</tr>
							<tr>
								<td>GlO AIRTIME</td>
								<td>% 93.0</td>
							</tr>
							<tr>
								<td>9MOBILE AIRTIME</td>
								<td>% 95.0</td>
							</tr>
							<tr>
								<td>AIRTEL AIRTIME</td>
								<td> % 97.0</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="BuyData-submain Price mtn-price">
					MTN DATA
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Plan Size</th>
								<th>Prices</th>
								<th>Validity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>50.0 MB</td>
								<td>₦25.0</td>
								<td>30 days</td>
							</tr>
							<tr>
								<td>40.0 MB</td>
								<td>₦40.0</td>
								<td>1 day</td>
							</tr>
							<tr>
								<td>150.0 MB</td>
								<td>₦45.0</td>
								<td>30 days</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="BuyData-submain Price glo-price">
					GlO DATA
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Plan Size</th>
								<th>Prices</th>
								<th>Validity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>50.0 MB</td>
								<td>₦25.0</td>
								<td>30 days</td>
							</tr>
							<tr>
								<td>40.0 MB</td>
								<td>₦40.0</td>
								<td>1 day</td>
							</tr>
							<tr>
								<td>150.0 MB</td>
								<td>₦45.0</td>
								<td>30 days</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="BuyData-submain Price airtel-price">
					Airtel DATA
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Plan Size</th>
								<th>Prices</th>
								<th>Validity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>50.0 MB</td>
								<td>₦25.0</td>
								<td>30 days</td>
							</tr>
							<tr>
								<td>40.0 MB</td>
								<td>₦40.0</td>
								<td>1 day</td>
							</tr>
							<tr>
								<td>150.0 MB</td>
								<td>₦45.0</td>
								<td>30 days</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="BuyData-submain Price etisalat-price">
					9mobile DATA
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Plan Size</th>
								<th>Prices</th>
								<th>Validity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>50.0 MB</td>
								<td>₦25.0</td>
								<td>30 days</td>
							</tr>
							<tr>
								<td>40.0 MB</td>
								<td>₦40.0</td>
								<td>1 day</td>
							</tr>
							<tr>
								<td>150.0 MB</td>
								<td>₦45.0</td>
								<td>30 days</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Container>
		</div>
	);
}

export default Prices;
