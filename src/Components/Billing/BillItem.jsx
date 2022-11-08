import React, { useState, useEffect } from "react";
import "./BillItem.css";
import DeleteIcon from "../../images/icons/delete-icon.svg";

function BillItem({
  removeBillItem,
  index,
  billItem,
  setBillItems,
  billItems,
}) {
  // const [id, setId] = useState(billItem.id)
  const [name, setName] = useState(billItem.Name);
  const [quantity, setQuantity] = useState(billItem.Quantity);
  const [price, setPrice] = useState(billItem.Price);
  const [total, setTotal] = useState(billItem.Total);

  

  useEffect(() => {
    const updateValue = () => {
      setTotal(quantity * price);
      billItem.Total = quantity * price;
      const newBillItems = billItems;
      newBillItems[index] = billItem;
      setBillItems([...newBillItems]);
    }
    updateValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, price, billItem]);

  const handleProductName = (e) => {
    billItem.Name = e.target.value;
    setName(e.target.value);
  };

  const handleProductQuantity = (e) => {
    if(!isNaN(e.target.value) && e.target.value !== ''){
    billItem.Quantity = parseFloat(e.target.value);
    setQuantity(parseFloat(e.target.value));
    }
  };

  const handleProductPrince = (e) => {
    if(!isNaN(e.target.value) && e.target.value !== '') {
    billItem.Price = parseFloat(e.target.value);
    setPrice(parseFloat(e.target.value));
    }
  };

  return (
    <div className="BillItem">
      <h6 className="product-sno">{index + 1}</h6>
      <input
        type="text"
        className="product-name"
        onChange={(e) => handleProductName(e)}
        value={name}
      />
      <input
        type="number"
        className="product-quantity"
        onChange={(e) => handleProductQuantity(e)}
        value={quantity}
      />
      <input
        type="number"
        className="product-price"
        onChange={(e) => handleProductPrince(e)}
        value={price}
      />
      <button
        className="delete-btn"
        onClick={() => {
          removeBillItem(index);
        }}
      >
        <img src={DeleteIcon} alt="" />
      </button>
      <h6 className="product-total">{total}</h6>
    </div>
  );
}

export default BillItem;
