import React from 'react'
import './ProfileDetailsHead.css'

function ProfileDetailsHead({setProductState, productValue}) {
  return (
    <div className='ProfileDetailsHead'>
      <button style={productValue ? {color:"#022964"}: {}} onClick = {()=> {setProductState(true)}}>Purchase</button>
      <button style={!productValue ? {color:"#022964"}: {}} onClick = {()=> {setProductState(false)}}>Payment</button>
    </div>
  )
}

export default ProfileDetailsHead