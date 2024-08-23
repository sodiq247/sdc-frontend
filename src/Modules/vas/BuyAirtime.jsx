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

const BuyAirtime = (props) => {
  const { handleSubmit, register, watch } = useForm();
  const [showModal, setShowModal] = useState(false);
  const { state, reduceWallet } = useWallet();
  const [amountToPay, setAmountToPay] = useState(0);
  const [message, setMessage] = useState("");
  const [transactionDetails, setTransactionDetails] = useState({
    network: "",
    airtime_type: "",
    mobile_number: "",
    amount: 0,
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const balance = state.balance;

  const airtime = async (data) => {
    setShowModal(true);
    const { amount, network, airtime_type, mobile_number } = data;

    if (balance < amountToPay ) {
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
  };

  const handleProceed = async () => {
    try {
      const data = {
        amount: watch("amount"),
        network: watch("network"),
        airtime_type: watch("airtime_type"),
        mobile_number: watch("mobile_number"),
      };

      let response = await vasServices.airTime(data);
      reduceWallet(amountToPay);

      console.log("Transaction successful");
      setMessage("Transaction successful");
      setShowModal(false);
      // Handle the response as needed
    } catch (error) {
      console.error("Error occurred during transaction:", error);
      // Handle error as needed
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
      <Container className='BuyData-main'>
        {/* {message && <div className="alert alert-info">{message}</div>} */}
        <div className='BuyData-submain Form-submain'>
          <Row>
            <Col sm={8} xs={{ order: "" }} className='BuyData-form'>
              <Form onSubmit={handleSubmit(airtime)}>
                {message && <div className='alert alert-info'>{message}</div>}
                <Form.Label className='label'>Network</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  {...register("network")}>
                  <option></option>
                  <option value='1'>MTN</option>
                  <option value='2'>GLO</option>
                  <option value='3'>Airtel</option>
                  <option value='3'>9mobile</option>
                </Form.Select>
                <Form.Label className='label phone-label'>
                  Airtime type
                </Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  {...register("airtime_type")}>
                  <option></option>
                  <option value='VTU'>VTU</option>
                  <option value='Share and Sell'>SHARE and SELL</option>
                </Form.Select>
                <p className='mb-3 plan-note'>VTU or share and Sell</p>
                <Form.Group>
                  <Form.Label className='label phone-label'>
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type='phone-number'
                    placeholder='08105082299'
                    className='mb-3'
                    {...register("mobile_number")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='label'>Amount</Form.Label>
                  <Form.Control
                    type=''
                    placeholder='Enter your amount'
                    className='mb-3'
                    {...register("amount", { onChange: updateAmountToPay })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='label phone-label'>
                    Amount to pay
                  </Form.Label>
                  <Form.Control
                    type='text'
                    value={amountToPay}
                    readOnly
                    className='mb-3'
                  />
                </Form.Group>
                <Button className='Buy-now-btn' type='submit' onClick={airtime}>
                  Buy Now
                </Button>
                {/* Modal for displaying transaction details */}
                <Modal
                  show={showModal}
                  size='lg'
                  aria-labelledby='contained-modal-title-vcenter'
                  centered
                  onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Transaction Details</Modal.Title>
                    {/* {message && <div className="alert alert-info">{message}</div>} */}
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      You're about to send{" "}
                      {/* {transactionDetails.network}{" "} */}
                      {/* {transactionDetails.airtime_type}  */}₦
                      {transactionDetails.amount} Airtime to{" "}
                      {transactionDetails.mobile_number}
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Close
                    </Button>
                    {/* Proceed button can submit the form */}
                    <Button
                      variant='primary'
                      type='submit'
                      onClick={handleProceed}>
                      Proceed
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            </Col>
            {/* <Col sm={4} xs={{ order: '' }}>sm=4</Col> */}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default BuyAirtime;
