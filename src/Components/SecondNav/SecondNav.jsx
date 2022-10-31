import React from "react";
import { useNavigate } from 'react-router-dom'
import "./SecondNav.css";

function SecondNav(props) {
  const pathName = props.pathName;
  let navigate = useNavigate();
  const routeManage = ()=>{
    navigate('/');
  }
  const routeBilling = ()=>{
    navigate('/billing');
  }
  return (
    <div className="SecondNav">
      {pathName === "/login" ? (
        <div className="loginLabel">
          <h4 className="loginTxt">Login</h4>
        </div>
      ) : (
        ""
      )}
      {pathName === "/login" ? (
        ""
      ) : (
        <div className="mainRoot">
          <button onClick={routeManage} style={{backgroundColor: pathName === "/" ? 'white' : '#F1F1F1'}}>Manage</button>
          <button onClick={routeBilling} style={{backgroundColor: pathName === "/billing" ? 'white' : '#F1F1F1'}}>Billing</button>
        </div>
      )}
    </div>
  );
}

export default SecondNav;
