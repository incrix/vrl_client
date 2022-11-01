import React from 'react'
import CustomerHead from './CustomerHead'
import CustomerBody from './CustomerBody'
import './Customer.css'

function Customer() {
  return (
    <div className='Customer'>
        <div className='Customer-content'>
            <CustomerHead />
            <CustomerBody />
        </div>
    </div>
  )
}

export default Customer