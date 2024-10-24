/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner
import { useState } from "react";
import { useForm } from "react-hook-form";
import vasServices from "../../Services/vasServices";
import { useWallet } from "../../Components/Wallet";

const Electricity = () => {
	const { handleSubmit, register, watch } = useForm();
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false); // Add loading state
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { state, reduceWallet } = useWallet();
	const [amountToPay, setAmountToPay] = useState(0);
	const [message, setMessage] = useState("");
	const [validatedData, setValidatedData] = useState({}); // Store validated data here

	const balance = state.balance;

	const validateMeter = async (data) => {
		setLoading(true); // Start loading
		console.log("data", data);
		try {
			const response = await vasServices.validateMeter(data);
			setMessage(`${response.name} - ${response.address}`);

			// Store the validated form data in the state
			setValidatedData({
				disconame: data.disconame,
				amount: data.amount,
				meternumber: data.meternumber,
				mtype: data.mtype,
			});

			handleShow();
		} catch (error) {
			console.error(error);
			console.log("An error occurred while validating the meter.", error);
			setMessage("An error occurred while validating the meter.");
		} finally {
			setLoading(false); // Stop loading
		}
		setLoading(false); // Stop loading
	};

	const electric = async () => {
		setLoading(true); // Start loading

		if (
			!validatedData.disconame ||
			!validatedData.meternumber ||
			!validatedData.mtype
		) {
			setMessage("Please validate the meter first.");
			return;
		}

		if (balance < amountToPay) {
			setMessage("Insufficient balance");
		} else {
			try {
				// Prepare data for submission
				const submissionData = {
					disconame: validatedData.disconame,
					amount: amountToPay, // Use the discounted amount
					meternumber: validatedData.meternumber,
					mtype: validatedData.mtype,
				};

				let response = await vasServices.electric(submissionData);
				setMessage("Transaction Successful");
			} catch (error) {
				console.error(error);
				console.log("An error occurred during the transaction.", error);
				setMessage("Transaction Unsuccessful");
			}
		}
		setLoading(false);
		// setTimeout(() => {
		// 	handleClose();
		// 	window.location.reload(); // Reload the page when the modal is closed
		// }, 5000);
	};

	const updateAmountToPay = () => {
		const enteredAmount = parseFloat(watch("amount"));
		if (!isNaN(enteredAmount)) {
			const amountToPay = enteredAmount - enteredAmount * 0.02;
			const roundedAmountToPay = Math.round(amountToPay * 100) / 100;
			setAmountToPay(roundedAmountToPay);
			setValidatedData((prevData) => ({ ...prevData, amount: enteredAmount }));
		}
	};

	return (
		<div>
			<Header />
			<Sidebar />
			<Container className="BuyData-main">
				<div className="BuyData-submain Form-submain">
					<Row>
						<Col sm={8} className="BuyData-form BuyAirtime">
							<Form
								className="input-form"
								onSubmit={handleSubmit(validateMeter)}>
								<Form.Label className="label">Disco Name</Form.Label>
								<Form.Select
									aria-label="Disco name"
									className="mb-3"
									required
									{...register("disconame")}>
									<option value="">Select Disco</option>
									<option value="Ikeja Electric">Ikeja Electric</option>
									<option value="Eko Electric">Eko Electric</option>
									<option value="Abuja Electric">Abuja Electric</option>
									<option value="Kano Electric">Kano Electric</option>
									<option value="Enugu Electric">Enugu Electric</option>
									<option value="Port Harcourt Electric">
										Port Harcourt Electric
									</option>
									<option value="Ibadan Electric">Ibadan Electric</option>
									<option value="Kaduna Electric">Kaduna Electric</option>
									<option value="Jos Electric">Jos Electric</option>
									<option value="Yola Electric">Yola Electric</option>
									<option value="Benin Electric">Benin Electric</option>
								</Form.Select>

								<Form.Label className="label phone-label">
									Meter Number
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Meter Number"
									className="mb-3"
									required
									{...register("meternumber")}
								/>

								<Form.Label className="label phone-label">
									Meter Type
								</Form.Label>
								<Form.Select
									aria-label="Meter type"
									className="mb-3"
									required
									{...register("mtype")}>
									<option value="">Select Meter Type</option>
									<option value="Prepaid">Prepaid</option>
									<option value="Postpaid">Postpaid</option>
								</Form.Select>
								
								<Form.Label className="label">Amount</Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter Amount"
									className="mb-3"
									required
									{...register("amount", { onChange: updateAmountToPay })}
								/>

								<Button
									className="Buy-now-btn"
									type="submit"
									disabled={loading}>
									{loading ? (
										<>
											<Spinner animation="border" size="sm" /> Validating...
										</>
									) : (
										"Validate"
									)}
								</Button>
							</Form>
						</Col>
					</Row>
				</div>

				<Modal
					show={show}
					onHide={handleClose}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header closeButton>
						<Modal.Title>Transaction Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{message && <div className="alert alert-info">{message}</div>}
						<Form.Group>
							<Form.Label className="label">Disco Name</Form.Label>
							<Form.Control
								type="text"
								value={validatedData.disconame}
								className="mb-3"
								readOnly
							/>
							<Form.Label className="label">Meter Number</Form.Label>
							<Form.Control
								type="text"
								value={validatedData.meternumber}
								className="mb-3"
								readOnly
							/>
							<Form.Label className="label">Meter Type</Form.Label>
							<Form.Control
								type="text"
								value={validatedData.mtype}
								className="mb-3"
								readOnly
							/>
							<Form.Label className="label">
								0.2 Percent Discounted Amount
							</Form.Label>
							<Form.Control
								type="text"
								value={amountToPay}
								className="mb-3"
								readOnly
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={electric} disabled={loading}>
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
			</Container>
		</div>
	);
};

export default Electricity;
