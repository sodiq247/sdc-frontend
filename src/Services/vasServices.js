/** @format */

import axios from "axios";
let baseUrl = "http://localhost:5030/api/v1/vas/";
const token = localStorage.getItem("token")
const vasServices = {
	airTime: async (data) => {
		let response = await axios.post(`${baseUrl}airtime`, data);
		return response;
	},
	creditWallet: async (data) => {
		let response = await axios.post(`${baseUrl}creditWallet`, data);
		return response;
	},
	dataBundle: async (data) => {
		let response = await axios.post(`${baseUrl}data`, data).catch((err) => {
			console.log(err);
		});
		return response;
	},
	electric: async (data) => {
		let response = await axios.post(`${baseUrl}electric`, data).catch((err) => {
			console.log(err);
		});
		return response;
	},
	cablesub: async (data) => {
		let response = await axios.post(`${baseUrl}cablesub`, data).catch((err) => {
			console.log(err);
		});
		return response;
	},
	validateMeter: async (data) => {
		let response = await axios.post(`${baseUrl}validateMeter`, data);
		return response;
	},
	validateIUC: async (data) => {
		let response = await axios.post(`${baseUrl}validateIUC`, data);
		return response;
	},
	InitilizePaystack: async (data) => {
		let response = await axios.post(`${baseUrl}initialize_paystack`, data, {headers:{Authorization:token}});
		window.open(response.authorization_url)
	},
	verifyPaystack: async (data) => {
		let response = await axios.post(`${baseUrl}verify_paystack`, data, {headers:{Authorization:token}})	
		return response;
	},
};

export default vasServices;
