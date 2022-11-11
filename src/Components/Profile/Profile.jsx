import React, { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom"
import "./Profile.css";
import ProfileData from "./ProfileData";
import ProfileDetails from "./ProfileDetails";
import VerifyAdmin from "../VerifyAdmin";

function Profile({ setPageTitle }) {
  const {id} = useParams();
  const [customer, setCustomer] = useState({})
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
    fetch("http://localhost:5050/api/admin/customer/details", {
    method: "Post",
    headers: {
      Accept: "application/json",
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
      console.log(error)
    });
    // eslint-disable-next-line
  },[])


  return (
    
    <div className="Profile">
      <div className="profile-content">
        <ProfileData />
        <ProfileDetails balance={customer.balance}/>
      </div>
    </div>
  );
}

export default Profile;
