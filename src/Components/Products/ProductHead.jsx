import React from "react";
import "./ProductHead.css";

function ProductHead(props) {
  const {
    stateChange: { setAddProduct, addProduct },
  } = props;

  return (
    <div className="ProductHead">
      <h6>ID</h6>
      <h6>Product</h6>
      <div className="search">
        <input type="text" placeholder="Enter Product" />
        <button>Search</button>
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
