import React, { useEffect } from 'react';
import axios from 'axios';
import vasServices from '../Services/vasServices'
import { json, useLocation } from 'react-router-dom';

const PaymentCallback = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const reference = query.get('reference');

  useEffect(() => {
    const verifyPayment = async () => {
        let data= {
            reference
          }
      try {       
        const response = await vasServices.verifyPaystack(data);      
        if (response.status === 'success') {
          // Handle successful payment (e.g., update UI, notify user)
          console.log("the payment was great");
        } else {
          // Handle failed payment
          console.log("the payment was not great");
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);

  return (
    <div>
      <h1>Payment Callback</h1>
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default PaymentCallback;
