/** @format */
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faSignal,
  faLightbulb,
  faTv,
  faWallet,
  faTag,
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { useWallet } from "../../Components/Wallet";

const Dashboard = () => {
  const { state } = useWallet();

  return (
    <div>
      <Header />
      <Sidebar />
      <div className='dashboard-main'>
        <div className='dashboard'>
          <Container className='dashboard-child'>
            <h2 className='welcome'>Welcome to Supreme Data Concept</h2>
            <div className='greeting'>Good evening, Hi {state.name} {state.lastname}</div>
            <div className='status'>
              Refer people to Husmodata.com and get 5% of their first payment
              <br />
              Referal Link:{" "}
              <a href='https://www.Husmodata.com/signup/?referal=SupremeDC'>
                https://www.Husmodata.com/signup/?referal=SupremeDC
              </a>
            </div>
            <Row className='bank-list'>
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
                <div className='bank-acct' id='gtbank'>
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
              </Col>
            </Row>
            <Row className='transaction'>
              <a href='/user/airtime' className='transaction-items'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faWallet} className='icon' />
                </Col>
                transactions
              </a>
              <a href='/user/airtime' className='transaction-items'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faSignal} className='icon' />
                </Col>
                Data transactions
              </a>
              <a href='/user/airtime' className='transaction-items'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faPhoneVolume} className='icon' />
                </Col>
                Airtime transactions
              </a>
              <a href='/user/airtime' className='transaction-items'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faWallet} className='icon' />
                </Col>
                Wallet summary
              </a>
            </Row>
          </Container>
        </div>
        <div className='notification-div'>
          <Container>
            <Row>
              <Col lg={4} xs={12} sm={12} className='wallet-items'>
                <p>Wallet Balance</p>
                <p>Wallet Balance: ₦{state.balance}</p>
              </Col>
              <Col lg={4} xs={12} sm={12} className='wallet-items'>
                <p>Referral Bonus</p>
                <h4>₦ 0.0</h4>
              </Col>
              <Col lg={4} xs={12} sm={12} className='wallet-items'>
                <p>My Total Referral</p>
                <h4>0</h4>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='notification-div'>
          <Container>
            <Row>
              <Col lg={4} className='notification-items'>
                <h3>Notifications</h3>
                <p>
                  Payment successful, your account has been credited with the sum of
                  ₦2350.
                </p>
                <Button variant='info'>All Messages</Button>
              </Col>
              <Col lg={4} className='notification-items'>
                <h3>FAQs:</h3>
                <p>
                  Please go through them to have a better knowledge of this
                  platform.
                </p>
                <Button variant='secondary'>FAQ?</Button>
              </Col>
              <Col lg={4} className='notification-items'>
                <h3>Support Team:</h3>
                <p>
                  Have anything to say to us? Please contact our Support Team on
                  WhatsApp.
                </p>
                <Button variant='success'>WhatsApp</Button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='services'>
          <Container>
            <Row>
              <Link to='/BuyAirTime' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faPhoneVolume} className='icon' />
                </Col>
                Buy Airtime
              </Link>
              <Link to='/BuyData' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faSignal} className='icon' />
                </Col>
                Buy Data
              </Link>
              <Link to='/Electricity' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faLightbulb} className='icon' />
                </Col>
                Electricity
              </Link>
              <Link to='/TvSubscription' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faTv} className='icon' />
                </Col>
                TV Subscription
              </Link>
            </Row>
            <Row>
              <Link to='/FundWallet' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faWallet} className='icon' />
                </Col>
                Fund Wallet
              </Link>
              <Link to='/Prices' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faTag} className='icon' />
                </Col>
                Prices
              </Link>
              <Link to='/Account' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faUser} className='icon' />
                </Col>
                Account
              </Link>
              <Link to='/Settings' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faGear} className='icon' />
                </Col>
                Settings
              </Link>
            </Row>
            <Row>
              <Link to='/Logout' className='service'>
                <Col lg={3} xs={6} sm={4}>
                  <FontAwesomeIcon icon={faRightFromBracket} className='icon' />
                </Col>
                Log Out
              </Link>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
