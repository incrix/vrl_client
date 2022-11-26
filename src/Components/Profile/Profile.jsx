import React, { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom"
import "./Profile.css";
import ProfileData from "./ProfileData";
import ProfileDetails from "./ProfileDetails";
import VerifyAdmin from "../VerifyAdmin";
import PopUp from "../PopUp";

function Profile({ setPageTitle }) {
  const {id} = useParams();
  const [customer, setCustomer] = useState({})
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
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setPageTitle(customer.name);
  });

  useEffect(()=>{
    fetch(`${global.config.ROOT_URL}customer/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({customerId: id})
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === 200){
        setCustomer(data.customer);
      }
    })
    .catch((error) => {
      return(error)
    });
    // eslint-disable-next-line
  },[])


  return (
    
    <div className="Profile">
      <div className="profile-content">
        <ProfileData setIsAlert={setIsAlert} setAlertProp={setAlertProp}/>
        <ProfileDetails balance={customer.balance}/>
      </div>
      {isAlert ?<PopUp popup={alertProp} /> : ""}
    </div>
  );
}

export default Profile;
