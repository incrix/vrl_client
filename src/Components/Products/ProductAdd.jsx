import React, { useState } from "react";
import "./ProductAdd.css";

function ProductAdd(props) {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const {
    stateChange: { setAddProduct, addProduct },
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

    const path = await fetch("/api/admin/product/upload", {
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

    console.log(path);

    fetch("http://localhost:5050/api/admin/product/add", {
      method: "POST",
      body: JSON.stringify({
        name: productName,
        description: "A Product from VRL Agro",
        path,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAddProduct(!addProduct)
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
