import React, {useState, useEffect} from 'react'
import './Product.css'
import ProductBody from './ProductBody'
import ProductHead from './ProductHead'
import ProductAdd from './ProductAdd'
import { useNavigate } from "react-router-dom";
import VerifyAdmin from "../VerifyAdmin";

function Product() {
  const [addProduct, setAddProduct] = useState(false);
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


  return (
    <div className='Product'>
        <div className="Product-content">
            <ProductHead stateChange ={{setAddProduct, addProduct}} />
            {addProduct ? <ProductAdd stateChange ={{setAddProduct, addProduct}} /> : ''}
            <ProductBody />
        </div>
    </div>
  )
}

export default Product