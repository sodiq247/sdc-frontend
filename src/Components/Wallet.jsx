import React, { createContext, useContext, useReducer, useEffect } from "react";
import accountServices from "../Services/authServices";

// Action types
const SET_BALANCE_AND_NAME = "SET_BALANCE_AND_NAME";
const SET_ERROR = "SET_ERROR";

// Reducer function
const walletReducer = (state, action) => {
  switch (action.type) {
    case SET_BALANCE_AND_NAME:
      return { ...state, balance: action.payload.balance, name: action.payload.name, lastname: action.payload.lastname };
    case SET_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  balance: 0,
  name: "",
  errorMessage: "",
};

// Create a context
const WalletContext = createContext(initialState);

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const fetchWalletBalance = async () => {
    try {
      const result = await accountServices.walletBalance();
      const balance = result.Wallet.amount; // Adjust based on actual response structure
      const name = result.Profile.firstname; // Adjust based on actual response structure
      const lastname = result.Profile.lastname; // Adjust based on actual response structure
      dispatch({ 
        type: SET_BALANCE_AND_NAME, 
        payload: { balance, name, lastname } 
      });
      console.log("walletBalance:", balance, "name:", name, "lastname:", lastname);
      console.log("walletBalance:result", result);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      dispatch({
        type: SET_ERROR,
        payload: "Failed to fetch wallet balance. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

// Create a custom hook to use the context
export const useWallet = () => {
  return useContext(WalletContext);
};
