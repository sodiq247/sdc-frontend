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
			<Route path="/dashboard" Component={Dashboard} />
			<Route path="/buyData" Component={BuyData} />
			<Route path="/buyAirtime" Component={BuyAirtime} />
			<Route path="/electricity" Component={Electricity} />
			<Route path="/tvSubscription" Component={TvSubscription} />
			<Route path="/settings" Component={Settings} />
			<Route path="/account" Component={Account} />
			<Route path="/prices" Component={Prices} />
			<Route path="/fundWallet" Component={FundWallet} />
			<Route path="/paywithPaystack" Component={PaywithPaystack } />
			<Route path="/confirmation" Component={PaymentConfirmation } />
		</Routes>
	);
};

export default Root;
