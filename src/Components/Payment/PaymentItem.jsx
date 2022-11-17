import React, {useState} from "react";
import './PaymentItem.css'

function PaymentItem(props) {
  const [amount, setAmount]= useState('')
  const { name, phone, balance } = props.data;
  const token = localStorage.getItem("token");

  const onEnter = (e)=>{
    const value = e.target.value;
    setAmount(value)
  }
  const onPay = () =>{
    if(amount > 0 && balance > 0){
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
          console.log(data); 
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      console.log("Enter Valid Amount");
    }
    
  }
  return (
    <div className="paymentItem">
      <h6>{name}</h6>
      <h6>{phone}</h6>
      <h6>{balance}</h6>
      <div className="paymentInput">
        <div>₹</div>
        <input type="number" placeholder="Enter the amount" onChange={(e)=>{onEnter(e)}}/>
        <button onClick={onPay}>Pay</button>
      </div>
    </div>
  );
}

export default PaymentItem;
