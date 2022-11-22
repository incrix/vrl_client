import React from "react";
import "./ProductItem.css";

function ProductItem({ data, getProductList, setIsAlert, setAlertProp }) {
  const { id, product, image } = data;
  

  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    await fetch(`${global.config.ROOT_URL}product/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          getProductList();
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
    <div className="ProductItem">
      <h6 style={{ width: "120px" }}>{id}</h6>
      <h6>{product}</h6>
      <div className="productImage">
        <img src={image} alt="product" />
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductItem;
