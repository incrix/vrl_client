import React from "react";
import './ProductItem.css'

function ProductItem(props) {
  const { id, product, image_url} = props.data;
  return (
    <div className="ProductItem">
      <h6>{id}</h6>
      <h6>{product}</h6>
      <div className="productImage">
        <img src={image_url} alt="product" />
      </div>
      <button>Delete</button>
    </div>
  );
}

export default ProductItem;
