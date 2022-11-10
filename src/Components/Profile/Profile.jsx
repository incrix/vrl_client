import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "./Profile.css";
import ProfileData from "./ProfileData";
import ProfileDetails from "./ProfileDetails";
import VerifyAdmin from "../VerifyAdmin";

function Profile({ setPageTitle }) {
  // const {id} = useParams();
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
  useEffect(() => {
    setPageTitle("Avinash");
  });

  return (
    <div className="Profile">
      <div className="profile-content">
        <ProfileData />
        <ProfileDetails />
      </div>
    </div>
  );
}

export default Profile;
