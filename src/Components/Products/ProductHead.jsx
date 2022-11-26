import React, { useState } from "react";
import "./ProductHead.css";

function ProductHead(props) {
  const {
    addProductState: { setAddProduct, addProduct },
    setProductList,
  } = props;

  // eslint-disable-next-line
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const onSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value !== "") {
      fetch(`${global.config.ROOT_URL}product/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProductList(data);
        })
        .catch((error) => {
          return(error);
        });
    } else {
      fetch(`${global.config.ROOT_URL}product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProductList(data);
        })
        .catch((error) => {
          return(error);
        });
    }
  };

  return (
    <div className="ProductHead">
      <h6 style={{ width: "120px" }}>ID</h6>
      <h6>Product</h6>
      <div className="search">
        <input type="text" placeholder="Search Product" onChange={onSearch}/>
      </div>
      {addProduct ? (
        <button
          className="productCancelBtn"
          onClick={() => {
            setAddProduct(!addProduct);
          }}
        >
          Cancel
        </button>
      ) : (
        <button
          className="productAddBtn"
          onClick={() => {
            setAddProduct(!addProduct);
          }}
        >
          Add
        </button>
      )}
    </div>
  );
}

export default ProductHead;
