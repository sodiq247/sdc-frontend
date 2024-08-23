import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useForm } from "react-hook-form";
import { useWallet } from "../../Components/Wallet";
import vasServices from "../../Services/vasServices";
import tvPlans from "../Plans/tvPlans.json";

const TvSubscription = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { handleSubmit, register } = useForm();
  const { state, reduceWallet } = useWallet();
  const [selectedTvType, setSelectedTvType] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(""); // Initialize selectedTvPlan here
  const [amountToPay, setAmountToPay] = useState(0);
  const [message, setMessage] = useState("");

  const balance = state.balance;

  const validateIUC = async (data) => {
    console.log("response...", data);

    try {
      const response = await vasServices.validateIUC(data);
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while validating the meter.");
    }
  };

  const cableTVForm = () => {
    const cableTVForm = document.getElementById("cableTV-form");
    const validateIUCForm = document.getElementById("validate-IUCform");

    if (cableTVForm.classList.contains("d-none")) {
      cableTVForm.classList.remove("d-none");
      validateIUCForm.classList.add("d-none");
      setShow(false);
    }
  };

  const cabletv = async (data) => {
    console.log("response...", data);

    if (balance < amountToPay) {
      console.log("Insufficient balance");
      setMessage("Insufficient balance");
    } else {
      let response = await vasServices.cablesub(data);
      console.log(response);
      reduceWallet(amountToPay);

      console.log("Transaction successful");
      setMessage("Transaction successful");
    }
  };

  const handleTvTypeChange = (event) => {
    const tvType = event.target.value;
    setSelectedTvType(tvType);
    // Reset selected plan and amount when data type changes
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
   

      const selectedPlans = tvPlans[selectedTvType][planId];
      const selectedPlan = selectedPlans
      console.log("checking..", selectedPlans)

      if (selectedPlan) {
        const amount = parseFloat(selectedPlan.amount);
        console.log("amount..", amount)
        const amountToPay = amount + 100;
        // const amountToPay = amountCharge - amountCharge * 0.015; // 1.5% discount
        const roundedAmountToPay = Math.round(amountToPay * 100) / 100;
        setAmountToPay(roundedAmountToPay);
        console.log("Updated Amount to Pay:", roundedAmountToPay);
      }
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Container className='BuyData-main'>
        <div className='BuyData-submain Form-submain'>
          <Row>
            <Col sm={8} xs={{ order: "" }} className='BuyData-form BuyAirtime'>
              <Form
                className=' input-form'
                id='validate-IUCform'
                onSubmit={handleSubmit(validateIUC)}>
                <Form.Label className='label'>CableTV Name</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  {...register("cablename")}>
                  <option>Select a CableTV</option>
                  <option value='GOTV'>GOTV</option>
                  <option value='DSTV'>DSTV</option>
                  <option value='STARTIME'>STARTIME</option>
                </Form.Select>
                <Form.Label className='label'>
                  Smart Card Number / IUC Number
                </Form.Label>
                <Form.Control
                  type='phone-number'
                  placeholder='200'
                  className='mb-3'
                  {...register("smart_card_number")}
                />
                <Button
                  className='Buy-now-btn'
                  onClick={handleShow}
                  type='submit'>
                  Validate
                </Button>{" "}
              </Form>
              <Form
                className='d-none input-form'
                id='cableTV-form'
                onSubmit={handleSubmit(cabletv)}>
                {message && <div className='alert alert-info'>{message}</div>}
                <Form.Label className='label'>Cable-TV Name</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  value={selectedTvType}
                  {...register("cablename")}
                  onChange={handleTvTypeChange}>
                  <option>Select a CableTV</option>
                  <option value='1'>GOTV</option>
                  <option value='2'>DSTV</option>
                  <option value='3'>STARTIME</option>
                </Form.Select>
                <Form.Group>
                  <Form.Label className='label'>
                    Smart Card Number / IUC Number
                  </Form.Label>
                  <Form.Control
                    type='phone-number'
                    placeholder='200'
                    className='mb-3'
                    {...register("smart_card_number")}
                  />
                </Form.Group>
                <Form.Label className='label'>Cable-Tv Plan</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  {...register("cableplan", { onChange: updateAmountToPay })}
                  value={selectedPlanId}
                  onChange={handleTvPlanChange}>
                  <option value=''>Select a plan</option>
                  {selectedTvType &&
                    tvPlans[selectedTvType].map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.title}
                      </option>
                    ))}
                </Form.Select>
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
                <Button className='Buy-now-btn' type='submit'>
                  Buy now
                </Button>{" "}
              </Form>
            </Col>
            {/* <Col sm={4} xs={{ order: '' }}>sm=4</Col> */}
          </Row>
        </div>
        <div>
          <Modal
            show={show}
            onHide={handleClose}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message && <div className='alert alert-info'>{message}</div>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={cableTVForm}>
                Proceed
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </div>
  );
};

export default TvSubscription;
