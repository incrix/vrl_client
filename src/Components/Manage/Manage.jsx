import React from 'react'
import { Link } from 'react-router-dom';
import './Manage.css'
import CustomerIcon from '../../images/icons/customer-logo.png'
import PaymentIcon from '../../images/icons/payment-logo.png'
import AnalyticsIcon from '../../images/icons/analytics-logo.png'
import ProductIcon from '../../images/icons/product-logo.png'

function Manage() {
  return (
    <div className='Manage'>
        <Link to="customer" className='manageItem'>
            <img src={CustomerIcon} alt="" />
            <div className='manageItemLabel'>Customer</div>
        </Link>
        <Link to="/payment" className='manageItem'>
            <img src={PaymentIcon} alt="" />
            <div className='manageItemLabel'>Payment</div>
        </Link>
        <Link to="analytics" className='manageItem'>
            <img src={AnalyticsIcon} alt="" />
            <div className='manageItemLabel'>Analytics</div>
        </Link>
        <Link to="product" className='manageItem'>
            <img src={ProductIcon} alt="" />
            <div className='manageItemLabel'>Product</div>
        </Link>
    </div>
  )
}

export default Manage