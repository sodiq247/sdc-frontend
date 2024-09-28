/** @format */

import axios from "axios";

let baseUrl = "https://sdc-back.onrender.com/api/v1/account/";

const accountServices = {
	login: async function (data) {
		let response = await axios.post(`${baseUrl}token`, data);
		return response;
	},
	signup: async function (data) {
		let response = await axios.post(`${baseUrl}`, data);
		console.log("Signup Response: and Data", response, data);
		alert(response);
		return;
		// return response;
	},
	resetPassword: async function (data) {
		let response = await axios.post(`${baseUrl}change-password`, data);
		return response;
	},
	updateProfile: async function (data) {
		let response = await axios.put(`${baseUrl}update-profile`, data);
		return response;
	},
	walletBalance: async () => {
		try {
			const token = localStorage.getItem("token");
			// console.log("tooooken", token)
			if (!token) throw new Error("Token not found");

			let response = await axios.get(`${baseUrl}verify`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			// console.log("Wallet balance response:", response);
			return response;
		} catch (error) {
			console.error("Error fetching wallet balance:", error);
			throw error; // Re-throw the error for handling in the component
		}
	},
};

export default accountServices;
