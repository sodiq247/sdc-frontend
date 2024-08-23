import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { PaystackConsumer } from "react-paystack";
import { useWallet } from "../Components/Wallet";
import vasServices from "../Services/vasServices";

const PayWithPaystack = () => {
  const [amount, setAmount] = useState(""); // State for amount input
  const [email, setEmail] = useState(""); // State for email input
  const { addWallet } = useWallet();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: parseInt(amount) * 100, // Convert amount to kobo (assuming it's in Naira)
    publicKey: "pk_test_2fa77e4d6a3815e581c8f57a3e9c872bd2acd626",
  };

  const handleSuccess = (reference) => {
    const updatedBalance = addWallet(parseInt(amount));
    alert("Transaction successful", updatedBalance.balance);
    console.log(updatedBalance.balance);
  };

  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };
  const handlePaystack = async()=>{
    let data= {
      email,
      amount: parseInt(amount) * 100
    }
    let response = await vasServices.InitilizePaystack(data);
  }
  return (
    <div>
      <Header />
      <Sidebar />
      <div className='dashboard-main'>
        <div className='dashboar'>
          <Container className='dashboard-child'>
            <Row className='bank-list fund-list'>
              <h1 className='banks gtco-border'>
                <Col lg={10} xs={6} sm={4}>
                  Pay with paystack
                </Col>
              </h1>
            </Row>
            <Row>
              <Col lg={12} xs={12} sm={12}>
                <div className='bank-acct fundwallet ' id='gtbank'>
                  <div>
                    <label>Amount</label>
                    <br />
                    <input
                      class='form-control col-6 mt-2'
                      type='number'
                      placeholder='Enter your Amount'
                      value={amount}
                      onChange={handleAmountChange}
                    />
                    <br />
                    <label>Email</label>
                    <input
                      class='form-control col-6 mt-2'
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  {/* </div>
                <div> */}
                  {/* <PaystackConsumer {...componentProps}>
                    {({ initializePayment }) => (
                      <button
                        onClick={() =>
                          initializePayment(handleSuccess, handleClose)
                        }
                        class='Buy-now-btn btn-primary'>
                        Proceed
                      </button>
                    )}
                  </PaystackConsumer> */}
                  <button
                        onClick={() =>
                          handlePaystack()
                        }
                        class='Buy-now-btn btn-primary'>
                        Proceed
                      </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PayWithPaystack;
