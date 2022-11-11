import React, {useState} from 'react'
import './ProfileDetails.css'
import ProfileDetailsHead from './ProfileDetailsHead'
import ProfileDetailsFoot from './ProfileDetailsFoot'
import ProfileProductList from './ProfileProductList'
import ProfilePaymentList from './ProfilePaymentList'

function ProfileDetails({balance}) {
    const [product, setProduct] = useState(true)
  return (
    <div className='ProfileDetails'>
        <ProfileDetailsHead setProductState={setProduct} productValue={product}/>
        {product ? <ProfileProductList/> : <ProfilePaymentList/>}
        <ProfileDetailsFoot balance={balance}/>
    </div>
  )
}

export default ProfileDetails