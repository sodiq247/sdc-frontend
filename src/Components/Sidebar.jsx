/** @format */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faPhoneVolume,
  faSignal,
  faLightbulb,
  faTv,
  faWallet,
  faTag,
  faUser,
  faGear,
  faRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useWallet } from "./Wallet";
// import Wallet from "./Wallet";
// import Button from "react-bootstrap/Button";

const Sidebar = () => {
  const { state } = useWallet();
  return (
    <div className='sidebar web'>
      <div className='sidebar-sticky '>
        <div className='profile'>
          <FontAwesomeIcon icon={faCircleUser} className='profile-icon' />
          <p className='profile-name'>Abdulrazaq sodiq</p>
        </div>
        <div className='wallet-balance'>
          Wallet Balance: <br /> ₦{state.balance}
        </div>
        <hr />
        <ul className='sidebar-list'>
          <li>
            <Link to='/Dashboard'>
              <FontAwesomeIcon icon={faHouseChimney} className='icon' />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/BuyAirtime'>
              <FontAwesomeIcon icon={faPhoneVolume} className='icon' />
              Buy Airtime
            </Link>
          </li>
          <li>
            <Link to='/BuyData'>
              <FontAwesomeIcon icon={faSignal} className='icon' />
              Buy Data
            </Link>
          </li>
          <li>
            <Link to='/Electricity'>
              <FontAwesomeIcon icon={faLightbulb} className='icon' />
              Electricity
            </Link>
          </li>
          <li>
            <Link to='/TVSubscription'>
              <FontAwesomeIcon icon={faTv} className='icon' />
              TV Subscription
            </Link>
          </li>
          <li>
            <Link to='/FundWallet'>
              <FontAwesomeIcon icon={faWallet} className='icon' />
              Fund Wallet
            </Link>
          </li>
          <li>
            <Link to='/PaywithPaystack'>
              <FontAwesomeIcon icon={faWallet} className='icon' />
              PaywithPaystack
            </Link>
          </li>
          <li>
            <Link to='/Prices'>
              <FontAwesomeIcon icon={faTag} className='icon' />
              Prices
            </Link>
          </li>
          <li>
            <Link to='/Account'>
              <FontAwesomeIcon icon={faUser} className='icon' />
              Account
            </Link>
          </li>
          <li>
            <Link to='/Settings'>
              <FontAwesomeIcon icon={faGear} className='icon' />
              Settings
            </Link>
          </li>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={faRightFromBracket} className='icon' />
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
