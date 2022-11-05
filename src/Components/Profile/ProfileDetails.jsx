import React from 'react'
import './ProfileDetails.css'
import ProfileDetailsHead from './ProfileDetailsHead'
import ProfileDetailsFoot from './ProfileDetailsFoot'

function ProfileDetails() {
  return (
    <div className='ProfileDetails'>
        <ProfileDetailsHead />
        <ProfileDetailsFoot />
    </div>
  )
}

export default ProfileDetails