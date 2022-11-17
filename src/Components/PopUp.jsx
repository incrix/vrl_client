import React from "react";
import Warning from "../images/icons/warning.svg";
import Success from "../images/icons/success.svg";
import Failed from "../images/icons/failed.svg";

const styles = {
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
    background: `rgba(0,0,0,0.2)`
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  popup: {
    width: 400,
    height: 300,
    position: "absolute",
    top: `calc(50% - 200px)`,
    left: `calc(50% - 150px)`,
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: `4px 4px 8px rgba(0, 0, 0, 0.2)`,
  },
  text: {
    margin: `20px 15px 0 15px`,
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonPrimary: {
    padding: "8px 20px",
    minWidth: 100,
    fontSize: 18,
    fontWeight: 700,
    background: "#022964",
    color: "white",
    border: "none",
  },
  buttonSecondary: {
    padding: "8px 20px",
    minWidth: 100,
    fontSize: 18,
    fontWeight: 700,
    background: "#DDDDDD",
    color: "#4F4F4F",
    border: "none",
  },
};

export default function PopUp({ popup: { status, message, buttonProperty } }) {
  const renderSwitch = () => {
    switch (status) {
      case "Warning":
        return Warning;
      case "Failed":
        return Failed;
      case "Success":
        return Success;
      default:
        return Warning;
    }
  };

  return (
    <div className="PopUp" style={styles.content}>
      <div className="popup-content" style={styles.popup}>
        <div style={styles.message}>
          <img src={renderSwitch()} alt="" style={styles.image} />
          <div style={styles.text}>{message}</div>
        </div>
        <div style={styles.buttonRow}>
          {buttonProperty.map((item, index) => {
            return (
              <button
                style={
                  item.primary ? styles.buttonPrimary : styles.buttonSecondary
                }
                key={index}
                onClick={item.action}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// {/* <PopUp popup={popup}/> */}
// const popup ={
//   status: "Success",
//   message: "Profile added successfully",
//   buttonProperty:[
//     {
//       name: "Ok",
//       primary:true,
//       action: ()=>{
//         console.log("Save");
//       }
//     },
//   ]
// }
