/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/user/Dashboard";
import BuyData from "../Modules/vas/BuyData";
import BuyAirtime from "../Modules/vas/BuyAirtime";
import Electricity from "../Modules/vas/Electricity";
import TvSubscription from "../Modules/vas/TvSubscription";
import Settings from "../Pages/Settings";
import Account from "../Pages/Account";
import Prices from "../Pages/Prices";
import FundWallet from "../Pages/FundWallet";
import PaywithPaystack from "../Pages/PaywithPaystack";
import Logout from "../Pages/Logout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PaymentConfirmation from "../Pages/PaymentConfirmation";
const Root = () => {
	return (
		<Routes>
			<Route path="/" exact Component={Login} />
			<Route path="/Signup" Component={Signup} />
			<Route path="/Logout" Component={Logout} />
			<Route path="/Dashboard" Component={Dashboard} />
			<Route path="/BuyData" Component={BuyData} />
			<Route path="/BuyAirtime" Component={BuyAirtime} />
			<Route path="/Electricity" Component={Electricity} />
			<Route path="/TvSubscription" Component={TvSubscription} />
			<Route path="/Settings" Component={Settings} />
			<Route path="/Account" Component={Account} />
			<Route path="/Prices" Component={Prices} />
			<Route path="/FundWallet" Component={FundWallet} />
			<Route path="/PaywithPaystack" Component={PaywithPaystack } />
			<Route path="/confirmation" Component={PaymentConfirmation } />
		</Routes>
	);
};

export default Root;
