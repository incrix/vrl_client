import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProfileData.css";

function ProfileData() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const token = localStorage.getItem("token");
  const [fieldDisable, setFieldDisable] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [uzhavar, setUzhavar] = useState("");
  const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/admin/customer/details", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customerId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const customer = data.customer
          setCustomer(customer);
          setName(customer.name)
          setPhone(customer.phone)
          setAadhar(customer.aadharId?customer.aadharId:"")
          setUzhavar(customer.uzhavarId?customer.uzhavarId :"")
          setDob(customer.dob?customer.dob:"")
          setGender(customer.gender?customer.gender:"")
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  
  const changeHandler = (e, setChange) => {
    let value = e.target.value
    setChange(value);
  };
  const changeGender = (e)=>{
    let value = e.target.value
    value === "true" ? value = true: value === "false" ? value = false : value = null;
    setGender(value)
  }

  const onSave =()=>{
    const newData = customer
    name.length < 3 ?console.log("Name invalid"): newData.name = name ;
    phone.length !== 10 ?console.log("Phone invalid"): newData.phone = phone ;
    aadhar.length !== 12 ?console.log("Aadhar invalid"): newData.aadharId = aadhar ;
    uzhavar.length === 0 ?console.log("Uzhavar invalid"): newData.uzhavarId = uzhavar ;
    dob.length !== 10 ?console.log("DOB invalid"): newData.dob = dob ;
    gender === '' ? delete newData.gender: newData.gender = gender ;
    newData.customerId = id;
    console.log(newData);
    fetch("http://localhost:5050/api/admin/customer/update", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFieldDisable(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="ProfileData">
      <div className="profileDataItem">
        <label htmlFor="profileName">Name</label>
        <input
          type="text"
          name="profileName"
          value={name}
          required
          disabled={ fieldDisable ? "disabled" : ""}
          onChange={(e) => changeHandler(e, setName)}
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
          onChange={(e) => changeHandler(e, setPhone)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileAadhar">Aadhar ID</label>
        <input
          type="number"
          name="profileAadhar"
          value={aadhar}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={(e) => changeHandler(e, setAadhar)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileUzhavar">Uzhavar ID</label>
        <input
          type="text"
          name="profileUzhavar"
          value={uzhavar}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={(e) => changeHandler(e, setUzhavar)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileDob">DOB</label>
        <input
          type="date"
          name="profileUzhavar"
          value={dob}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={(e) => changeHandler(e, setDob)}
        />
      </div>
      <div className="profileDataItem">
        <label htmlFor="profileGender">Gender</label>
        <select value={gender} disabled={fieldDisable ? "disabled" : ""} onChange={(e) => changeGender(e)}>
          <option name="male" value={null}> Select</option>
          <option name="male" value={true}> Male</option>
          <option name="female" value={false}>Female</option>
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
            <button className="saveButton" onClick={onSave}>
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
