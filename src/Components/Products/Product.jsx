import React, {useState} from 'react'
import './Product.css'
import ProductBody from './ProductBody'
import ProductHead from './ProductHead'
import ProductAdd from './ProductAdd'

function Product() {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <div className='Product'>
        <div className="Product-content">
            <ProductHead stateChange ={{setAddProduct, addProduct}} />
            {addProduct ? <ProductAdd /> : ''}
            <ProductBody />
        </div>
    </div>
  )
}

export default Product