import React, {useEffect} from "react";
import "./Payment.css";
import PaymentBody from "./PaymentBody";
import PaymentHead from "./PaymentHead";
import { useNavigate } from "react-router-dom";
import VerifyAdmin from "../VerifyAdmin";

function Payment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isvalid) => {
      if (!isvalid || isvalid instanceof Error) {
        navigate("/login");
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="Payment">
      <div className="Payment-content">
        <PaymentHead />
        <PaymentBody />
      </div>
    </div>
  );
}

export default Payment;
