/** @format */
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useWallet } from "../../Components/Wallet";
import { useForm } from "react-hook-form";
import vasServices from "../../Services/vasServices";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner

const BuyAirtime = (props) => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm();
	const [showModal, setShowModal] = useState(false);
	const { state, reduceWallet } = useWallet();
	const [amountToPay, setAmountToPay] = useState(0);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false); // Add loading state

	const [transactionDetails, setTransactionDetails] = useState({
		network: "",
		airtime_type: "",
		mobile_number: "",
		amount: 0,
	});

	const handleShow = () => setShowModal(true);
	const handleClose = () => {
		setShowModal(false);
		window.location.reload(); // Reload the page when the modal is closed
	};

	const balance = state.balance;

	const airtime = async (data) => {
		const { amount, network, airtime_type, mobile_number } = data;

		if (balance < amountToPay) {
			setShowModal(false);
			console.log("Insufficient balance");
			setMessage("Insufficient balance");
		} else {
			// Set transaction details for the modal
			setTransactionDetails({
				network,
				airtime_type,
				mobile_number,
				amount,
			});

			// Show the modal
			handleShow();
			console.log("Waiting for proceed");
		}
		setLoading(false); // Stop loading
	};

	const handleProceed = async () => {
		setLoading(true); // loading

		try {
			const data = {
				amount: watch("amount"),
				network: watch("network"),
				airtime_type: watch("airtime_type"), // Corrected field name
				mobile_number: watch("mobile_number"),
				airtime_type:"VTU"
			};

			let response = await vasServices.airTime(data);

			console.log("Transaction data", data);
			console.log("Transaction successful");
			setMessage("Transaction successful");
			setShowModal(false);
			// Handle the response as needed
		} catch (error) {
			console.error("Error occurred during transaction:", error);
			setMessage("Transaction unsuccessful");
			// Handle error as needed
		}
		setLoading(false); // Stop loading
		// setTimeout(() => {
		// 	handleClose();
		// 	window.location.reload(); // Reload the page when the modal is closed
		// }, 5000);
	};

	const updateAmountToPay = () => {
		const enteredAmount = parseFloat(watch("amount"));
		if (!isNaN(enteredAmount)) {
			// Subtract 2% from the entered amount
			const amountToPay = enteredAmount - enteredAmount * 0.02;
			// Round to 2 decimal places
			const roundedAmountToPay = Math.round(amountToPay * 100) / 100;
			setAmountToPay(roundedAmountToPay);
		}
	};

	return (
		<div>
			<Header />
			<Sidebar />
			<Container className="BuyData-main">
				{/* {message && <div className="alert alert-info">{message}</div>} */}
				<div className="BuyData-submain Form-submain">
					<Row>
						<Col sm={8} xs={{ order: "" }} className="BuyData-form">
							<Form onSubmit={handleSubmit(airtime)}>
								{message && <div className="alert alert-info">{message}</div>}

								<Form.Label className="label">Network</Form.Label>
								<Form.Select
									aria-label="Default select example"
									className="mb-3"
									required
									{...register("network", { required: "Network is required" })}>
									<option value="">Select Network</option>
									<option value="1">MTN</option>
									<option value="2">GLO</option>
									<option value="3">Airtel</option>
									<option value="4">9mobile</option>
								</Form.Select>
								<Form.Group>
									<Form.Label className="label phone-label">
										Phone Number
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Phone Number"
										className="mb-3"
										required
										{...register("mobile_number", {
											required: "Phone number is required",
										})}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label">Amount</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter Amount"
										className="mb-3"
										required
										{...register("amount", {
											required: "Amount is required",
											onChange: updateAmountToPay,
											valueAsNumber: true,
										})}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label className="label phone-label">
										Amount to pay
									</Form.Label>
									<Form.Control
										type="text"
										value={amountToPay}
										readOnly
										className="mb-3"
									/>
									<Button className="Buy-now-btn" type="submit">
										Buy Now
									</Button>
								</Form.Group>

								{/* Modal for displaying transaction details */}
								<Modal
									show={showModal}
									size="lg"
									aria-labelledby="contained-modal-title-vcenter"
									centered
									onHide={handleClose}>
									<Modal.Header>
										<Modal.Title>Transaction Details</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										{message && (
											<div className="alert alert-info">{message}</div>
										)}

										<p>
											You're about to send ₦{transactionDetails.amount} Airtime
											to {transactionDetails.mobile_number}
										</p>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>
											Close
										</Button>
										<Button
											variant="primary"
											onClick={handleProceed}
											disabled={loading}>
											{loading ? (
												<>
													<Spinner animation="border" size="sm" /> Proceeding...
												</>
											) : (
												"Proceed"
											)}
										</Button>
									</Modal.Footer>
								</Modal>
							</Form>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default BuyAirtime;
