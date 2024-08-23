/** @format */

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function Account() {
	return (
		<div>
			<Header />
			<Sidebar />
			<Container className="BuyData-main">
				<div className="BuyData-submain Price pricing">
					<Table striped bordered hover>
						<tbody>
							<tr>
								<td>Username</td>
								<td>Abdulrazaq Sodiq</td>
							</tr>
							<tr>
								<td>Phone Number</td>
								<td>08105082299</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>Abdulrazaqsodiq2015@gmail.com</td>
							</tr>
							<tr>
								<td>Bank Name</td>
								<td> Gtbank</td>
							</tr>
							<tr>
								<td>Account Number</td>
								<td>0160157649</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Container>
		</div>
	);
}

export default Account;
