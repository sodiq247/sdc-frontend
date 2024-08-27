/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import vasServices from "../../Services/vasServices";
import dataTypes from "../Plans/dataTypes.json";
import { useWallet } from "../../Components/Wallet";

const BuyData = (props) => {
  const { handleSubmit, register } = useForm();
  const { state } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedDataType, setSelectedDataType] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [message, setMessage] = useState("");

  const balance = state.balance;

  const dataBundle = async (data) => {
    const { amount } = data;
    // console.log("balance", balance);
    // console.log("amount", amountToPay);

    if (balance < amountToPay) {
      setMessage("Insufficient balance");
    } else {
      try {
        let response = await vasServices.dataBundle({ ...data, amount: amountToPay });

        if (response.error) {
          setMessage("Transaction unsuccessful");
        } else {
          setMessage(response.api_response || "Transaction successful");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setMessage("Transaction unsuccessful");
      }
    }
  };

  const handleNetworkChange = (event) => {
    const network = event.target.value;
    setSelectedNetwork(network);

    // Reset selected plan, data type, and amount when network changes
    setSelectedPlanId("");
    setSelectedDataType("");
    setAmountToPay(0);
  };

  const handleDataTypeChange = (event) => {
    const dataType = event.target.value;
    setSelectedDataType(dataType);

    // Reset selected plan and amount when data type changes
    setSelectedPlanId("");
    setAmountToPay(0);
  };

  const handlePlanChange = (event) => {
    const planId = event.target.value;
    setSelectedPlanId(planId);
    updateAmountToPay(planId);
  };

  const updateAmountToPay = (planId) => {
    if (selectedNetwork && selectedDataType && planId) {
      const selectedPlans = dataTypes[selectedNetwork][selectedDataType];
      const selectedPlan = selectedPlans.find((plan) => plan.id === planId);

      if (selectedPlan) {
        const amount = parseFloat(selectedPlan.amount);
        const amountToPay = Math.round((amount + amount * 0.2) * 100) / 100; // Add 20% and round to 2 decimal places
        setAmountToPay(amountToPay);
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
            <Col sm={8} xs={{ order: "" }} className='BuyData-form'>
              {message && <div className='alert alert-info'>{message}</div>}
              <Form onSubmit={handleSubmit(dataBundle)}>
                <Form.Label className='label'>Network</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  {...register("network")}
                  onChange={handleNetworkChange}>
                  <option value=''>Select a network</option>
                  <option value='1'>MTN</option>
                  <option value='2'>GLO</option>
                  <option value='3'>9mobile</option>
                  <option value='4'>Airtel</option>
                </Form.Select>
                <Form.Label className='label phone-label'>Data Type</Form.Label>
                <Form.Select
                  aria-label='Select a network'
                  className='mb-3'
                  value={selectedDataType}
                  onChange={handleDataTypeChange}>
                  <option value=''>Select a data type</option>
                  {selectedNetwork &&
                    Object.keys(dataTypes[selectedNetwork]).map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                </Form.Select>
                <p className='mb-3 plan-note'>
                  Select Plan Type SME or GIFTING or CORPORATE GIFTING
                </p>
                <Form.Label className='label'>Plan</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mb-3'
                  {...register("plan")}
                  value={selectedPlanId}
                  onChange={handlePlanChange}>
                  <option value=''>Select a plan</option>
                  {selectedNetwork &&
                    selectedDataType &&
                    dataTypes[selectedNetwork][selectedDataType].map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.title}
                      </option>
                    ))}
                </Form.Select>
                <Form.Group>
                  <Form.Label className='label phone-label'>Phone Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter phone number'
                    className='mb-3'
                    {...register("mobile_number")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='label phone-label'>Amount to pay</Form.Label>
                  <Form.Control
                    type='text'
                    value={amountToPay}
                    readOnly
                    className='mb-3'
                  />
                </Form.Group>
                <Button className='Buy-now-btn' type='submit'>
                  Buy Now
                </Button>{" "}
              </Form>
            </Col>
            <Col sm={4} xs={{ order: "" }}>
              sm=4
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default BuyData;
