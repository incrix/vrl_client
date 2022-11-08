import React, {useContext} from "react";
import { useNavigate} from "react-router-dom";
import "./SecondNav.css";
import BackIcon from "../../images/icons/back-icon.png";
import Context from "../Context";

function SecondNav(props) {
  const pathName = props.pathName;
  const {ProfileNameContext} = Context;
  const profileName = useContext(ProfileNameContext);
  const loc = pathName.split("/");
  const pathTitle = capitalizeFirstLetter(loc[1]);
  let navigate = useNavigate();

  const routeManage = () => {
    navigate("/");
  };

  const routeBilling = () => {
    navigate("/billing");
  };

  return (
    <div className="SecondNav">
      {pathName === "/login" ? (
        <div className="loginLabel">
          <h4 className="loginTxt">Login</h4>
        </div>
      ) : (
        ""
      )}

      { pathName !== "/login" && pathName !== "/" && pathName !== "/billing" ? (
        <div className="indexLabel">
          <button onClick={()=> navigate(-1)}><img src={BackIcon} alt="" /></button>
          {loc.length !== 3 ?<span className="pageTitle">{pathTitle}</span> : <span className="pageTitle">{profileName.pageTitle}</span>}
          {/* { pathName === "/product" ? <span className="pageTitle">Product</span>: "" }
          { pathName === "/customer" ? <span className="pageTitle">Customer</span>: "" } */}
        </div>
      ) : (
        ""
      )}


      {pathName === "/login" ? (
        ""
      ) : (
        <div className="mainRoot">
          <button
            onClick={routeManage}
            style={{ backgroundColor: pathName === "/" ? "white" : "#F1F1F1" }}
          >
            Manage
          </button>
          <button
            onClick={routeBilling}
            style={{
              backgroundColor: pathName === "/billing" ? "white" : "#F1F1F1",
            }}
          >
            Billing
          </button>
        </div>
      )}
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default SecondNav;
