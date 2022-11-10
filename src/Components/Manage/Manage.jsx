import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Manage.css";
import CustomerIcon from "../../images/icons/customer-logo.png";
import PaymentIcon from "../../images/icons/payment-logo.png";
import AnalyticsIcon from "../../images/icons/analytics-logo.png";
import ProductIcon from "../../images/icons/product-logo.png";
import VerifyAdmin from "../VerifyAdmin";

function Manage() {
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
    <div className="Manage">
      <Link to="customer" className="manageItem">
        <img src={CustomerIcon} alt="" />
        <div className="manageItemLabel">Customer</div>
      </Link>
      <Link to="/payment" className="manageItem">
        <img src={PaymentIcon} alt="" />
        <div className="manageItemLabel">Payment</div>
      </Link>
      <Link to="analytics" className="manageItem">
        <img src={AnalyticsIcon} alt="" />
        <div className="manageItemLabel">Analytics</div>
      </Link>
      <Link to="product" className="manageItem">
        <img src={ProductIcon} alt="" />
        <div className="manageItemLabel">Product</div>
      </Link>
    </div>
  );
}

export default Manage;
