import React from "react";
import "./ProductBody.css";
import ProductItem from "./ProductItem";

function ProductBody({productList, getProductList, setIsAlert, setAlertProp}) {
  return (
    <div className="ProductBody">
      {productList.length !== 0 ?productList.map((item) => {
        return <ProductItem
          key={item._id}
          data={{
            id: item._id,
            product: item.name,
            image:
              `${global.config.ROOT_IMG_URL}${item.image}`,
          }}
          setIsAlert={setIsAlert} setAlertProp={setAlertProp}
          getProductList={getProductList}
        />;
      }): <div className='noProduct'>No Product Available</div>
    }
    </div>
  );
}

export default ProductBody;
