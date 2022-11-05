import React, { useState } from "react";
import "./ProfileData.css";

function ProfileData() {
  const [fieldDisable, setFieldDisable] = useState(true);
  const [name, setName] = useState("Avinash");
  const [phone, setPhone] = useState(9786799765);
  const [aadhar, setAadhar] = useState(978679976512);
  const [uzhavar, setUzhavar] = useState("SXAVJ37Y2SB");
  const [dob, setDob] = useState("1997-09-02");
//   const [gender, setGender] = useState(true);

  const changeHandler = (e, changeState) => {
    changeState(e.target.value);
  };
  return (
    <div className="ProfileData">
      <div className="profileDataItem">
        <label htmlFor="profileName">Name</label>
        <input
          type="text"
          name="profileName"
          value={name}
          required
          disabled={fieldDisable ? "disabled" : ""}
          onChange={e => changeHandler(e,setName)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profilePhone">Phone</label>
        <input
          type="number"
          name="profilePhone"
          value={phone}
          required
          disabled={fieldDisable ? "disabled" : ""}
          onChange={e => changeHandler(e,setPhone)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileAadhar">Aadhar ID</label>
        <input
          type="number"
          name="profileAadhar"
          value={aadhar}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={e => changeHandler(e,setAadhar)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileUzhavar">Uzhavar ID</label>
        <input
          type="text"
          name="profileUzhavar"
          value={uzhavar}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={e => changeHandler(e,setUzhavar)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileDob">DOB</label>
        <input
          type="date"
          name="profileUzhavar"
          value={dob}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={e => changeHandler(e,setDob)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileGender">Gender</label>
        <select disabled={fieldDisable ? "disabled" : ""} onChange={() => {}}>
          <option name="male"> Male</option>
          <option name="female">Female</option>
        </select>
      </div>
      <div className="profileDataItem">
        <div className="button">
          {fieldDisable ? (
            <button
              className="editButton"
              onClick={() => {
                setFieldDisable(false);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="cancelButton"
              onClick={() => {
                setFieldDisable(true);
              }}
            >
              Cancel
            </button>
          )}
          {!fieldDisable ? (
            <button className="saveButton" onClick={() => {}}>
              Save
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
