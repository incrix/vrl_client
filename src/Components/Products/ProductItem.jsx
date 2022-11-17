import React from "react";
import "./ProductItem.css";

function ProductItem({ data, getProductList }) {
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
        getProductList();
      })
      .catch((error) => {
        console.log(error);
      });
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
