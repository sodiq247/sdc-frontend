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
import { useWallet } from "./Wallet";
import { Link, useNavigate } from "react-router-dom";


const Sidebar = () => {
  const { state } = useWallet();
  
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear all data from local storage
		localStorage.clear();
		// Redirect to the login page
		navigate('/');
	};



  return (
    <div className='sidebar web'>
      <div className='sidebar-sticky '>
        <div className='profile'>
          <FontAwesomeIcon icon={faCircleUser} className='profile-icon' />
          <p className='profile-name'>Hi {state.name} {state.lastname}</p>
        </div>
        <div className='wallet-balance'>
          Wallet Balance: <br /> ₦{state.balance}
        </div>
        <hr />
        <ul className='sidebar-list'>
          <li>
            <Link to='/dashboard'>
              <FontAwesomeIcon icon={faHouseChimney} className='icon' />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/buyAirtime'>
              <FontAwesomeIcon icon={faPhoneVolume} className='icon' />
              Buy Airtime
            </Link>
          </li>
          <li>
            <Link to='/buyData'>
              <FontAwesomeIcon icon={faSignal} className='icon' />
              Buy Data
            </Link>
          </li>
          <li>
            <Link to='/electricity'>
              <FontAwesomeIcon icon={faLightbulb} className='icon' />
              Electricity
            </Link>
          </li>
          <li>
            <Link to='/tVSubscription'>
              <FontAwesomeIcon icon={faTv} className='icon' />
              TV Subscription
            </Link>
          </li>
          <li>
            <Link to='/fundWallet'>
              <FontAwesomeIcon icon={faWallet} className='icon' />
              Fund Wallet
            </Link>
          </li>
          <li>
            <Link to='/paywithPaystack'>
              <FontAwesomeIcon icon={faWallet} className='icon' />
              PaywithPaystack
            </Link>
          </li>
          <li>
            <Link to='/prices'>
              <FontAwesomeIcon icon={faTag} className='icon' />
              Prices
            </Link>
          </li>
          <li>
            <Link to='/account'>
              <FontAwesomeIcon icon={faUser} className='icon' />
              Account
            </Link>
          </li>
          <li>
            <Link to='/settings'>
              <FontAwesomeIcon icon={faGear} className='icon' />
              Settings
            </Link>
          </li>
          <li>
          <button onClick={handleLogout} className="logout-button">
							<FontAwesomeIcon icon={faRightFromBracket} className="icon" />
							Log Out
						</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
