import React, { useEffect } from "react";
// import { useParams } from "react-router-dom"
import "./Profile.css";
import ProfileData from "./ProfileData";
import ProfileDetails from "./ProfileDetails";

function Profile({ setPageTitle }) {
  // const {id} = useParams();
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
