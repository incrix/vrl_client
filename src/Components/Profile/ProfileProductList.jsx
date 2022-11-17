import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProfileProductList.css";
import ProductListItem from './ProductListItem'

function ProfileProductList() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch(`${global.config.ROOT_URL}purchase/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customerId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
  }, []);
  return (
    <div className="ProfileProductList">
      {productList.length !== 0? productList.map((item)=>{
        return <ProductListItem key={item._id} data={item} />;
      }): <div className="noPurchase">No Purchase Available</div>}
    </div>
  );
}



export default ProfileProductList;
