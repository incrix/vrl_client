import React from 'react'

function ProfileDetailsFoot({balance}) {

  return (
    <div className='ProfileDetailsFoot'>
      <h6>Balance</h6>
      <h6 style={{color: "#022964"}}>{`₹ ${balance !== undefined? balance: 0}`}</h6>
    </div>
  )
}

export default ProfileDetailsFoot