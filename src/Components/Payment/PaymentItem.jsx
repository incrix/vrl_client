import React, {useState} from "react";
import './PaymentItem.css'

function PaymentItem({data, setIsAlert, setAlertProp, getPaymentList}) {
  const [amount, setAmount]= useState('')
  const { name, phone, balance } = data;
  const token = localStorage.getItem("token");

  const onEnter = (e)=>{
    const value = e.target.value;
    setAmount(value)
  }
  const onPay = () =>{
    if(amount > 0 && balance > 0 && amount <= balance){
      fetch(`${global.config.ROOT_URL}payment/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: phone,
          amount: amount
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status === 200){
            getSuccessPopup(data.message)
            getPaymentList();
            return
          }
          if(data.status === 400){
            getFailedPopup(data.message)
            return
          }
        })
        .catch((error) => {
          getFailedPopup(error.message)
        });
    }else{
      getWarningPopup("Enter Valid Amount");
    }
    
  }
  const getWarningPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Warning",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
  };

  const getSuccessPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Success",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => {setIsAlert(false); setAmount(''); getPaymentList(); },
        },
      ],
    };
    setAlertProp(popup);
  };

  const getFailedPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Failed",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
  };
  return (
    <div className="paymentItem">
      <h6>{name}</h6>
      <h6>{phone}</h6>
      <h6>{balance}</h6>
      <div className="paymentInput">
        <div>₹</div>
        <input type="number" value={amount} placeholder="Enter the amount" onChange={(e)=>{onEnter(e)}}/>
        <button onClick={onPay}>Pay</button>
      </div>
    </div>
  );
}

export default PaymentItem;
