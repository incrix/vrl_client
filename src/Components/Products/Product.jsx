import React, { useState, useEffect } from "react";
import "./Product.css";
import ProductBody from "./ProductBody";
import ProductHead from "./ProductHead";
import ProductAdd from "./ProductAdd";
import { useNavigate } from "react-router-dom";
import VerifyAdmin from "../VerifyAdmin";
import PopUp from "../PopUp";

function Product() {
  const [addProduct, setAddProduct] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isAlert, setIsAlert] = useState(false)
  const [alertProp, setAlertProp] = useState({})
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isValid) => {
      if (!isValid || isValid instanceof Error) {
        navigate("/login");
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetch(`${global.config.ROOT_URL}product/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
          setProductList(data);
      })
      .catch((error) => {
        return(error);
      });
    // eslint-disable-next-line
  }, []);

  const getProductList = ()=>{
    fetch(`${global.config.ROOT_URL}product/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
          setProductList(data);
      })
      .catch((error) => {
        return(error);
      });
  }

  return (
    <div className="Product">
      <ProductHead addProductState={{ setAddProduct, addProduct }} setProductList={setProductList}/>
      <div className="Product-content">
        {addProduct ? (
          <ProductAdd stateChange={{ setAddProduct, addProduct }} getProductList={getProductList} setIsAlert={setIsAlert} setAlertProp={setAlertProp}/>
        ) : (
          ""
        )}
        <ProductBody productList={productList} getProductList={getProductList} setIsAlert={setIsAlert} setAlertProp={setAlertProp}/>
      </div>
      {isAlert ?<PopUp popup={alertProp} /> : ""}
    </div>
  );
}

export default Product;
