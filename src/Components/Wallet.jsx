import React, { createContext, useContext, useReducer } from "react";

// Define the wallet reducer
const walletReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { balance: state.balance + action.amount };
    case "REDUCE":
      return { balance: state.balance - action.amount };
    default:
      return state;
  }
};

// Create a context
const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, { balance: 5000 });

  const addWallet = (amount) => {
    dispatch({ type: "ADD", amount });
  };

  const reduceWallet = (amount) => {
    dispatch({ type: "REDUCE", amount });
  };

  return (
    <WalletContext.Provider value={{ state, addWallet, reduceWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Create a custom hook to use the context
export const useWallet = () => {
  return useContext(WalletContext);
};
