import React from 'react'
import './BillItem.css'
import DeleteIcon from '../../images/icons/delete-icon.svg'

function BillItem() {
  return (
    <div className='BillItem'>
        <h6 className='product-sno'>{"1"}</h6>
        <input type="text" className='product-name' />
        <input type="number" className='product-quantity' />
        <input type="number" className='product-price' />
        <button className='delete-btn'><img src={DeleteIcon} alt="" /></button>
        <h6 className='product-total'>{"0"}</h6>
    </div>
  )
}

export default BillItem