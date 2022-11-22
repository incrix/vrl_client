import React, { useState, useEffect, useRef } from "react";
import "./BillItem.css";
import DeleteIcon from "../../images/icons/delete-icon.svg";
import useDoubleClick from "use-double-click";

function BillItem({
  removeBillItem,
  index,
  billItem,
  setBillItems,
  billItems,
}) {
  const [search, setSearch] = useState(billItem.productName);
  const [quantity, setQuantity] = useState(billItem.quantity);
  const [price, setPrice] = useState(billItem.price);
  const [total, setTotal] = useState(billItem.total);
  const [isSearch, setIsSearch] = useState(false);
  const [productList, setProductList] = useState([]);
  const token = localStorage.getItem("token");

  const buttonRef = useRef();

  useDoubleClick({
    onDoubleClick: () => removeBillItem(index),
    ref: buttonRef,
    latency: 250,
  });


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
      return;
    }
    fetch(`${global.config.ROOT_URL}product/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const updateValue = () => {
      setTotal(quantity * price);
      billItem.total = quantity * price;
      const newBillItems = billItems;
      newBillItems[index] = billItem;
      setBillItems([...newBillItems]);
    };
    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, price, billItem]);


  const handleProductName = (name, id) => {
    billItem.productId = id;
    billItem.productName = name;
    setSearch(name);
  };

  const handleProductQuantity = (e) => {
    if (!isNaN(e.target.value)) {
      billItem.quantity = parseFloat(e.target.value);
      setQuantity(parseFloat(e.target.value));
      if (e.target.value === "") {
        billItem.quantity = "";
        setQuantity("");
      }
    }
  };

  const handleProductPrince = (e) => {
    if (!isNaN(e.target.value)) {
      billItem.price = parseFloat(e.target.value);
      setPrice(parseFloat(e.target.value));
      if (e.target.value === "") {
        billItem.price = "";
        setPrice("");
      }
    }
  };

  return (
    <div className="BillItem">
      <h6 className="product-sno">{index + 1}</h6>
      <div className="product">
        <input
          type="text"
          className="product-name"
          onChange={(e) => {
            handleSearch(e);
          }}
          value={search}
          onBlur={() => {
            setTimeout(() => {
              setProductList([]);
              setIsSearch(false);
            }, 100);
          }}
        />
        {isSearch ? (
          <div className="product-suggestion">
            {productList &&
              productList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="product-suggestion-item"
                    onClick={() => handleProductName(item.name, item._id)}
                  >
                    <p className="pro-name">{item.name}</p>
                  </div>
                );
              })}
              {productList.length === 0? <p className="no-product" onClick={() => {}}>No product available</p> : null}
          </div>
        ) : null}
      </div>

      <input
        type="number"
        className="product-quantity"
        onChange={(e) => handleProductQuantity(e)}
        value={quantity}
        onWheel={(event) => event.currentTarget.blur()}
      />
      <input
        type="number"
        className="product-price"
        onChange={(e) => handleProductPrince(e)}
        value={price}
        onWheel={(event) => event.currentTarget.blur()}
      />
      <button className="delete-btn" ref={buttonRef}>
        <img src={DeleteIcon} alt="" />
      </button>
      <h6 className="product-total">{total}</h6>
    </div>
  );
}

export default BillItem;
