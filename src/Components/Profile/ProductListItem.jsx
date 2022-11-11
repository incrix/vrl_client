import React, { useState } from "react";
import "./ProfileProductList.css";
import DownIcon from "../../images/icons/down-icon.svg";
import UpIcon from "../../images/icons/up-icon.svg";

function ProductListItem({data}) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="ProductListItem">
        <div className="ProductListItemHead">
          <h6>{data._id}</h6>
          <h6>{"₹ " + data.totalAmount}</h6>
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
        {!isExpanded ? (
          ""
        ) : (
          <div className="ProductListItemBody">
            <div className="ListItemHead">
              <h6>Product</h6>
              <h6>Quantity</h6>
              <h6>Price</h6>
              <h6>Total</h6>
            </div>
            {data.orderList.map((item,index)=>{
                return <ListItem key={index} data={item}/>
            })}
            <div className="ListItemFoot">
              <h6>{"Date: " + data.date.slice(0,10)}</h6>
              <h6>{"Total: ₹ " + data.totalAmount}</h6>
              <h6>{"Paid: ₹ " + data.paidAmount}</h6>
            </div>
          </div>
        )}
      </div>
    );
  
    function ListItem({data}) {
      return (
        <div className="ListItemBody">
          <h6>{data.productName}</h6>
          <h6>{data.quantity}</h6>
          <h6>{"₹ " + data.price}</h6>
          <h6>{"₹ " + data.total}</h6>
        </div>
      );
    }
  }

  export default ProductListItem;