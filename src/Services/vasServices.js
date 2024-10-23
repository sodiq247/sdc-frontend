/** @format */

import axios from "axios";
let baseUrl = "https://sdc-backend-t3j9.onrender.com/api/v1/vas/";
const token = localStorage.getItem("token");
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
		console.log("Me: ", data);
		let response = await axios.post(`${baseUrl}validateMeter`, data);
		console.log("res:", response);
		return response;
	},
	validateIUC: async (data) => {
		let response = await axios.post(`${baseUrl}validateIUC`, data);
		return response;
	},
	InitilizePaystack: async (data) => {
		let response = await axios.post(`${baseUrl}initialize_paystack`, data, {
			headers: { Authorization: token },
		});
		window.open(response.authorization_url);
	},
	verifyPaystack: async (data) => {
		let response = await axios.post(`${baseUrl}verify_paystack`, data, {
			headers: { Authorization: token },
		});
		return response;
	},
};

export default vasServices;
