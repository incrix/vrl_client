import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './ProfilePaymentList.css'

function ProfilePaymentList() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    fetch(`${global.config.ROOT_URL}payment/customer/list`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customerId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPaymentList(data);
      })
      .catch((error) => {
        return(error);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <div className='ProfilePaymentList'>
      {paymentList.length ? paymentList.map((item)=>{
        return <PaymentListItem key={item._id} data={item}/>
      }): <div className="noPayment"> No Payment Available</div>}
    </div>
  )
}

function PaymentListItem({data}){
  return(
    <div className="ListItem">
      <h6>{data._id}</h6>
      <h6>Date: {data.date.slice(0,10)}</h6>
      <h6>Paid: {"₹ " + data.amount}</h6>
    </div>
  );
}
export default ProfilePaymentList