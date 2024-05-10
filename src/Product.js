import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useNavigate } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import { PaymentContext, NameContext, EmailContext, NumberContext } from './App';
import axios from 'axios';
import TransactionConfirmation from './Confirmation/TransactionConfirmation'; // Import the confirmation page component

function Product() {
  const amount = 100;
  const currency = "INR";
  const receiptId = "qwsaq1";
  
  const [paymentId, setPaymentId] = useContext(PaymentContext);
  const [name, setName] = useContext(NameContext);
  const [email, setEmail] = useContext(EmailContext);
  const [number, setNumber] = useContext(NumberContext);
  const navigate = useNavigate();
  const sendPaymentEmail = async () => {
    try {
      const emailData = { name, email };
      const emailResponse = await axios.post('http://localhost:5000/getData', emailData);
      console.log(emailResponse);
    } catch (error) {
      console.error('Error sending payment email:', error);
    }
  };
  const paymentHandler = async (e) => {
    try {
      // Send payment email
      await sendPaymentEmail();

      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await response.json();
      
      var options = {
        key: "rzp_test_fS1cbWzLChQVyN",
        amount,
        currency,
        name: "Homaid",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };
          const validateRes = await fetch("http://localhost:5000/order/validate", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const jsonRes = await validateRes.json();
          const PaymentID = jsonRes.paymentId;
          if (jsonRes.msg === 'success') {
            setPaymentId(PaymentID);
            navigate('/success');
            const toSendemailUrl = 'http://localhost:5000/getData';
            const emailData = { name, email };
            const emailResponse = await axios.post(toSendemailUrl, emailData);
            console.log(emailResponse);
          }
        },
        prefill: {
          name: `${name}`,
          email: `${email}`,
          contact: `${number}`,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="product">
      <h1 className="heading">Homaid's Pay</h1>
      <div className="service-form-container">
        <ServiceForm />
        <button onClick={paymentHandler}>Pay</button>
      </div>
      <br />
    </div>
  );
}

export default Product;
