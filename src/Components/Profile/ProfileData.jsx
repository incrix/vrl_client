import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProfileData.css";

function ProfileData({ setIsAlert, setAlertProp }) {
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
    getCustomerDetails();
    // eslint-disable-next-line
  }, []);

  const getCustomerDetails = () => {
    console.log(`${global.config.ROOT_URL}customer/details`);
    fetch(`${global.config.ROOT_URL}customer/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customerId: id }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 200) {
          const customer = data.customer;
          setCustomer(customer);
          setName(customer.name);
          setPhone(customer.phone);
          setAadhar(customer.aadharId ? customer.aadharId : "");
          setUzhavar(customer.uzhavarId ? customer.uzhavarId : "");
          setDob(customer.dob ? customer.dob : "");
          setGender(customer.gender ? customer.gender : "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (e, setChange) => {
    let value = e.target.value;
    setChange(value);
  };
  const changeGender = (e) => {
    let value = e.target.value;
    if (value === "null") {
      setGender("");
      return;
    }
    value === "true"
      ? (value = true)
      : value === "false"
      ? (value = false)
      : (value = null);
    setGender(value);
  };

  const onSave = () => {
    const newData = customer;
    dob.length !== 10 ? getWarningPopup("Select DOB") : (newData.dob = dob);
    uzhavar.length === 0
      ? getWarningPopup("Invalid Uzhavar ID")
      : (newData.uzhavarId = uzhavar);
    aadhar.length !== 12
      ? getWarningPopup("Aadhar number should be 12 characters")
      : (newData.aadharId = aadhar);
    phone.length !== 10
      ? getWarningPopup("Invalid phone number")
      : (newData.phone = phone);
    name.length < 3
      ? getWarningPopup("Name should be more than 2 characters")
      : (newData.name = name);

    gender === "" ? delete newData.gender : (newData.gender = gender);

    if (
      !(
        name.length < 3 ||
        phone.length !== 10 ||
        aadhar.length !== 12 ||
        uzhavar.length === 0 ||
        dob.length !== 10
      )
    ) {
      newData.customerId = id;
      fetch(`${global.config.ROOT_URL}customer/update`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((data) => {
          data.status === 200
            ? getSuccessPopup(data.message)
            : getFailedPopup(data.message);
          setFieldDisable(true);
        })
        .catch((error) => {
          getFailedPopup(error);
        });
    }
  };

  const getWarningPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Warning",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
  };

  const getSuccessPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Success",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
  };

  const getFailedPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Failed",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
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
        <select
          value={gender}
          disabled={fieldDisable ? "disabled" : ""}
          onChange={(e) => changeGender(e)}
        >
          <option name="male" value={"null"}>
            {" "}
            Select
          </option>
          <option name="male" value={true}>
            {" "}
            Male
          </option>
          <option name="female" value={false}>
            Female
          </option>
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
                getCustomerDetails();
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
