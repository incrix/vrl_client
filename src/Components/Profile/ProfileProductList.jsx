import React, { useState } from "react";
import "./ProfileProductList.css";
import DownIcon from "../../images/icons/down-icon.svg";
import UpIcon from "../../images/icons/up-icon.svg";

function ProfileProductList() {
  return (
    <div className="ProfileProductList">
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
    </div>
  );
}

function ProductListItem() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="ProductListItem">
      <div className="ProductListItemHead">
        <h6>asjbxbuquhudhux</h6>
        <h6>{"₹ " + 450}</h6>
        {isExpanded ? (
          <button onClick={() => setIsExpanded(false)}>
            Collapse <img src={UpIcon} alt="" />
          </button>
        ) : (
          <button onClick={() => setIsExpanded(true)}>
            Expand <img src={DownIcon} alt="" />
          </button>
        )}
      </div>
      {!isExpanded ? "" : <div className="ProductListItemBody">
        <div className="ListItemHead">
            <h6>Product</h6>
            <h6>Quantity</h6>
            <h6>Price</h6>
            <h6>Total</h6>
        </div>
        <ListItem />
        <ListItem />
        <ListItem />
        <div className="ListItemFoot">
            <h6>{'Date:'+' 12-06-2022'}</h6>
            <h6>{'Total: ₹'+' 240'}</h6>
            <h6>{'Paid: ₹'+' 200'}</h6>
        </div>
        </div>}
    </div>
  );

  function ListItem() {
    return (
        <div className="ListItemBody">
          <h6>Cow Dung</h6>
          <h6>2</h6>
          <h6>{"₹ " + 40}</h6>
          <h6>{"₹ " + 80}</h6>
        </div>
    );
  }

}

export default ProfileProductList;
