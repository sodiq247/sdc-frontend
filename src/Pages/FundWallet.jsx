/** @format */
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import gtco from "../Assets/images/gtco";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
// import PayWithPaystack from "../Components/Utilities/paywithpaystack";

const FundWallet = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className='dashboard-main'>
        <div className='dashboar'>
          <Container className='dashboard-child'>
            <Row className='bank-list fund-list'>
              <a href='/user/airtime' className='banks gtco-border'>
                <Col lg={3} xs={6} sm={4}></Col>
                Gtbank
              </a>
              <a href='/user/airtime' className='banks'>
                <Col lg={3} xs={6} sm={4}></Col>
                Other Bank
              </a>
              <a href='/user/airtime' className='banks'>
                <Col lg={3} xs={6} sm={4}></Col>
                Other Bank
              </a>
              <a href='/user/airtime' className='banks'>
                <Col lg={3} xs={6} sm={4}></Col>
                Other Bank
              </a>
            </Row>
            <Row>
              <Col lg={12} xs={12} sm={12}>
                <div className='bank-acct fundwallet ' id='gtbank'>
                  <img src={gtco} alt='gtco logo' className='gtco-pic' />
                  <h3>
                    Account Number: 0807547109
                    <br />
                    Account Name: HUSMODATA - SupremeDC
                    <br />
                    Bank Name: GTBank
                    <br />
                    AUTOMATED BANK TRANSFER
                  </h3>
                  <p>Make transfer to this account to fund your wallet</p>
                </div>
                <div>
                  {/* <PayWithPaystack /> */}
                 
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
