/** @format */

import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Modal,
	Spinner,
} from "react-bootstrap";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useForm } from "react-hook-form";
import { useWallet } from "../../Components/Wallet";
import vasServices from "../../Services/vasServices";
import tvPlans from "../Plans/tvPlans.json";

const TvSubscription = () => {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [amountToPay, setAmountToPay] = useState(0);
	const [message, setMessage] = useState("");
	const [selectedTvType, setSelectedTvType] = useState("");
	const [selectedPlanId, setSelectedPlanId] = useState("");
	const [validatedData, setValidatedData] = useState({});
	const { handleSubmit, register, watch } = useForm();
	const { state, reduceWallet } = useWallet();
	const balance = state.balance;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const mapCablenameToNumber = (cablename) => {
		switch (cablename) {
			case "GOTV":
				return 1;
			case "DSTV":
				return 2;
			case "STARTIME":
				return 3;
			default:
				return null;
		}
	};

	const mapNumberToCablename = (number) => {
		switch (number) {
			case 1:
				return "GOTV";
			case 2:
				return "DSTV";
			case 3:
				return "STARTIME";
			default:
				return "";
		}
	};

	const validateIUC = async (data) => {
		setLoading(true);
		console.log("data", data);

		try {
			const response = await vasServices.validateIUC(data);
			console.log("data response", response);

			// Extract the plan title from tvPlans based on selected TV type and plan ID
			const selectedPlans = tvPlans[data.cablename] || [];
			const plan =
				selectedPlans.find((plan) => plan.id === data.cableplan) || {};
			const planTitle = plan.title || "";

			setValidatedData({
				...data,
				planTitle, // Store plan title in validatedData
			});

			setMessage(`${response.name}`);
			handleShow();
		} catch (error) {
			console.error("An error occurred while validating the meter.", error);
			setMessage("An error occurred while validating the meter.");
		} finally {
			setLoading(false);
		}
	};

	const cabletv = async () => {
		setLoading(true);

		const mappedCablename = mapCablenameToNumber(validatedData.cablename);
		const dataToSubmit = {
			...validatedData,
			cablename: mappedCablename,
		};

		if (balance < amountToPay) {
			setMessage("Insufficient balance");
		} else {
			try {
				const response = await vasServices.cablesub(dataToSubmit);
				setMessage("Transaction successful");
			} catch (error) {
				console.error("An error occurred during the transaction.", error);
				setMessage("Transaction Unsuccessful");
			}
		}
		setLoading(false);
		// setTimeout(() => {
		// 	handleClose();
		// 	window.location.reload(); // Reload the page when the modal is closed
		// }, 5000);
	};

	const handleTvTypeChange = (event) => {
		const tvType = event.target.value;
		setSelectedTvType(tvType);
		setSelectedPlanId("");
		setAmountToPay(0);
	};

	const handleTvPlanChange = (event) => {
		const planId = event.target.value;
		setSelectedPlanId(planId);
		updateAmountToPay(planId);
	};

	const updateAmountToPay = (planId) => {
		if (selectedTvType && planId) {
			const selectedPlans = tvPlans[selectedTvType] || [];
			const plan = selectedPlans.find((plan) => plan.id === planId) || {};
			const amount = parseFloat(plan.amount);
			const amountToPay = amount + 100; // Adjust this calculation if needed
			const roundedAmountToPay = Math.round(amountToPay * 100) / 100;
			setAmountToPay(roundedAmountToPay);
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
							<Form className="input-form" onSubmit={handleSubmit(validateIUC)}>
								<Form.Label className="label">Cable TV Name</Form.Label>
								<Form.Select
									aria-label="Cable TV Name"
									className="mb-3"
									value={selectedTvType}
									{...register("cablename")}
									onChange={handleTvTypeChange}>
									<option value="">Select a Cable TV</option>
									<option value="GOTV">GOTV</option>
									<option value="DSTV">DSTV</option>
									<option value="STARTIME">STARTIME</option>
								</Form.Select>
								<Form.Label className="label">Cable TV Plan</Form.Label>
								<Form.Select
									aria-label="Cable TV Plan"
									className="mb-3"
									{...register("cableplan")}
									value={selectedPlanId}
									onChange={handleTvPlanChange}>
									<option value="">Select a plan</option>
									{selectedTvType &&
										tvPlans[selectedTvType] &&
										tvPlans[selectedTvType].map((plan) => (
											<option key={plan.id} value={plan.id}>
												{plan.title}
											</option>
										))}
								</Form.Select>
								<Form.Label className="label">
									Smart Card Number / IUC Number
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Smart Card Number"
									className="mb-3"
									{...register("smart_card_number")}
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
							<Form.Label className="label d-none">Cable TV Name</Form.Label>
							<Form.Control
								type="text"
								value={mapNumberToCablename(validatedData.cablename) || ""}
								className="mb-3 d-none"
								readOnly
							/>
							<Form.Label className="label">
								Smart Card Number / IUC Number
							</Form.Label>
							<Form.Control
								type="text"
								value={validatedData.smart_card_number || ""}
								className="mb-3"
								readOnly
							/>
							<Form.Label className="label">Selected TV Plan</Form.Label>
							<Form.Control
								type="text"
								value={validatedData.planTitle || ""}
								className="mb-3"
								readOnly
							/>
							<Form.Label className="label">Amount to Pay</Form.Label>
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
						<Button variant="primary" onClick={cabletv} disabled={loading}>
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

export default TvSubscription;
