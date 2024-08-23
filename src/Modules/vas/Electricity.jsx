/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { useForm } from "react-hook-form";
import vasServices from "../../Services/vasServices";
import { useWallet } from "../../Components/Wallet";
// import { Alert } from "react-bootstrap";

const Electricity = (props) => {
	const { handleSubmit, register, watch } = useForm();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { state, reduceWallet } = useWallet();
	const [amountToPay, setAmountToPay] = useState(0);
	const [message, setMessage] = useState("");

	const balance = state.balance;

	const validateMeter = async (data) => {
		console.log('response...', data);

    try {
      const response = await vasServices.validateMeter(data);
      console.log(response);
	  setMessage(`${response.name} - ${response.address}`);
	//   console.log(ModalMessage)
    //   if (response.status === "successful") {
    //     setModalMessage(response.name);
    //     setIsModalOpen(true); // Open the modal
    //   } else {
    //     setModalMessage(response.message);
    //     setIsModalOpen(true); // Open the modal
    //   }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while validating the meter.");
    }
  };


  const electricForm = ()  => {
	const electricForm = document.getElementById("electric-form")
	const validateForm = document.getElementById("validate-form")
	
		if (electricForm.classList.contains("d-none")) {
			electricForm.classList.remove("d-none")
			validateForm.classList.add("d-none")
			setShow(false)
			 //console.log(1)
		}
	}
	

  const electric = async (data) => {
	const { amount } = data;
    if (balance < amount) {
      console.log("Insufficient balance");
	  setMessage("Insufficient balance");
    } else {
    let response = await vasServices.electric(data);
     console.log(response);
    reduceWallet(amountToPay);

      console.log("Transaction successful");
      setMessage("Transaction successful");
      // if (response.status === true) {
      //   setMessage(response.message);
      //   setInitialized(2);
      //   setLoading(false);
      // } else {
      //   setMessage(response.message);
      //   setLoading(false);
      // }
    }
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
				<div className="BuyData-submain Form-submain">
					<Row>
						<Col sm={8} xs={{ order: "" }} className="BuyData-form BuyAirtime">


						<Form className=" input-form" id="validate-form" onSubmit={handleSubmit(validateMeter)}>

								<Form.Label className="label">Dico Name
								</Form.Label>
						<Form.Select
									aria-label="Default select example"
									className="mb-3"
									{...register("disconame")}>
									<option></option>
									<option value="Ikeja Electric">Ikeja Electric</option>
									<option value="Eko Electric">Eko Electric</option>
									<option value="Abuja Electric">Abuja Electric</option>
									<option value="Kano Electric">Kano Electric</option>
									<option value="Enugu Electric">Enugu Electric</option>
									<option value="Port Harcourt Electric">Port Harcourt Electric</option>
									<option value="Ibadan Electric">Ibadan Electric</option>
									<option value="Kaduna Electric">Kaduna Electric</option>
									<option value="Jos Electric">Jos Electric</option>
									<option value=">Yola Electric">Yola Electric</option>
									<option value=">Benin Electric">Benin Electric</option>
								</Form.Select>
								
								<Form.Label className="label phone-label">
										Meter Number
										</Form.Label>
								<Form.Control
										type="phone-number"
										placeholder="08105082299"
										className="mb-3"
										{...register("meternumber")}
									/>
									
								<Form.Label className="label phone-label">
									Meter Type
									</Form.Label>
								<Form.Select
								aria-label="Default select example"
								className="mb-3"
								{...register("mtype")}>
								<option></option>
								<option value="Prepaid">Prepaid</option>
								<option value="Postpaid">Postpaid</option>
								</Form.Select>
								<Button className="Buy-now-btn" onClick={handleShow} type="submit">Validate</Button>{" "}
								
						</Form>
						<Form className="d-none input-form" id="electric-form" onSubmit={handleSubmit(electric)}>
						{message && <div className="alert alert-info">{message}</div>}		

								<Form.Label className="label">Dico Name</Form.Label>
								<Form.Select
									aria-label="Default select example"
									className="mb-3"
									{...register("disco_name")}>
									<option></option>
									<option value="1">Ikeja Electric</option>
									<option value="2">Eko Electric</option>
									<option value="3">Abuja Electric</option>
									<option value="4">Kano Electric</option>
									<option value="5">Enugu Electric</option>
									<option value="6">Port Harcourt Electric</option>
									<option value="7">Ibadan Electric</option>
									<option value="8">Kaduna Electric</option>
									<option value="9">Jos Electric</option>
									<option value="11">Yola Electric</option>
									<option value="13">Benin Electric</option>
								</Form.Select>
								<Form.Group>
									<Form.Label className="label phone-label">
										Meter Number
									</Form.Label>
									<Form.Control
										type="phone-number"
										placeholder="08105082299"
										className="mb-3"
										{...register("meter_number")}
									/>
								</Form.Group>
								<Form.Label className="label phone-label">
									Meter Type
								</Form.Label>
								<Form.Select
									aria-label="Default select example"
									className="mb-3"
									{...register("MeterType")}>
									<option></option>
									<option value="Prepaid">Prepaid</option>
									<option value="Postpaid">Postpaid</option>
								</Form.Select>
								<p className="mb-3 plan-note">VTU or share and Sell</p>
								<Form.Group>
									<Form.Label className="label">Amount</Form.Label>
									<Form.Control
										type="phone-number"
										placeholder="200"
										className="mb-3"
										{...register("amount", { onChange: updateAmountToPay })}
									/>
								</Form.Group>
								{/* <Form.Group>
									<Form.Label className="align-left">
										Customer Phone Number
									</Form.Label>
									<Form.Control
										type="phone-number"
										placeholder="200"
										className="mb-3"
										// {...register("network")}
									/>
								</Form.Group> */}
								{/* <p className='mb-3 plan-note'>Customer phone number</p> */}
								<Form.Group>
									<Form.Label className='label'>0.2 Percent Discount</Form.Label>
									<Form.Control
										type="phone-number"
										value={amountToPay}
										className="mb-3"
									/>
								</Form.Group>
								<Button className="Buy-now-btn" type="submit">Buy now</Button>{" "}
							</Form>
						</Col>
						{/* <Col sm={4} xs={{ order: '' }}>sm=4</Col> */}
					</Row>
				</div>
				<div>
				<Modal  show={show} onHide={handleClose} size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
						<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>						
							{message && <div className="alert alert-info">{message}</div>}		
						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={electricForm}>
							Proceed
						</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</Container>
			
		</div>
	);
}

export default Electricity;
