import React, { useState } from "react";
import "./ProductAdd.css";

function ProductAdd(props) {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const {
    stateChange: { setAddProduct, addProduct },
    getProductList, setIsAlert, setAlertProp

  } = props;

  const token = localStorage.getItem("token");

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    if(productName === ""){
      getWarningPopup("Product name is required");
      return;
    }
    if (image === "") {
      getWarningPopup("Image is required");
      return;
    }

    const path = await fetch(`${global.config.ROOT_URL}product/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.path;
      })
      .catch((error) => {
        getFailedPopup(error.message);
      });

    fetch(`${global.config.ROOT_URL}product/add`, {
      method: "POST",
      body: JSON.stringify({
        name: productName,
        description: "A Product from VRL Agro",
        path,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          getProductList();
          setAddProduct(!addProduct);
          getSuccessPopup(data.message);
          return;
        }
        if (data.status === 400) {
          getFailedPopup(data.message);
          return;
        }
      })
      .catch((error) => {
        getFailedPopup(error.message);
      });
      
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
    <div className="ProductAdd">
      <h6>ID Auto</h6>
      <input
        type="text"
        placeholder="Enter Product"
        className="inputProduct"
        onChange={handleProductName}
      />
      <input
        type="file"
        name="productImage"
        accept="image/*"
        className="inputImg"
        onChange={handleImage}
      />
      <button onClick={handleUpload}>Add</button>
    </div>
  );
}

export default ProductAdd;
