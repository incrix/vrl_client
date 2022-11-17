import React, { useState } from "react";
import "./ProductAdd.css";

function ProductAdd(props) {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const {
    stateChange: { setAddProduct, addProduct },
    getProductList
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
        console.log(error);
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
        setAddProduct(!addProduct)
        getProductList()
      })
      .catch((error) => {
        console.log(error);
      });
      
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
