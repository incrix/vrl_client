import React, {useEffect, useState} from "react";
import "./Payment.css";
import PaymentBody from "./PaymentBody";
import PaymentHead from "./PaymentHead";
import { useNavigate } from "react-router-dom";
import VerifyAdmin from "../VerifyAdmin";
import PopUp from "../PopUp";

function Payment() {
  const [paymentList, setPaymentList]=useState([])
  const [isAlert, setIsAlert] = useState(false)
  const [alertProp, setAlertProp] = useState({})

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isValid) => {
      if (!isValid || isValid instanceof Error) {
        navigate("/login");
      }
    });
    getPaymentList();
    // eslint-disable-next-line
  }, []);

  const getPaymentList =  async()=>{
    await fetch(`${global.config.ROOT_URL}payment/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPaymentList(data)
      })
      .catch((error) => {
        console.log(error)
      });
  }



  return (
    <div className="Payment">
      <div className="Payment-content">
        <PaymentHead setPaymentList={setPaymentList}/>
        <PaymentBody paymentList={paymentList} setIsAlert={setIsAlert} setAlertProp={setAlertProp} getPaymentList={getPaymentList}/>
      </div>
      {isAlert ?<PopUp popup={alertProp} /> : ""}
    </div>
  );
}

export default Payment;
