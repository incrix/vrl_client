import React from "react";
import './ProductAdd.css'

function ProductAdd() {
  return (
    <div className="ProductAdd">
      <h6>ID Auto</h6>
      <input type="text" placeholder="Enter Product" className="inputProduct"/>
      <input type="file" name="productImage" accept="image/*" className="inputImg" />
      <button>Add</button>
    </div>
  );
}

export default ProductAdd;
