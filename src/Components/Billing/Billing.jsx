import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Billing.css";
import BillingControl from "./BillingControl";
import BillingHead from "./BillingHead";
import BillItem from "./BillItem";
import BillingFoot from "./BillingFoot";

function Billing() {
  const [billItems, setBillItems] = useState([]);
  const [newBillItems, setNewBillItems] = useState(billItems);
  const [itemChild, setItemChild] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const elementRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
    setGrandTotal(billItems.reduce((acc, item) => acc + item.Total, 0));
  }, [ billItems, grandTotal]);

  useEffect(() => {
    setBillItems(newBillItems);
  }, [newBillItems]);

  useEffect(() => {
    setItemChild(billItems.map((billItem, index) => {
      return (
        <BillItem
          key={index}
          billItem={billItem}
          billItems={billItems}
          setBillItems={setBillItems}
          removeBillItem={removeBillItem}
          index={index}
        />
      );
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billItems]);

  const scrollToBottom = () => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addBillObject = () => {
    const newBillItems = [
      ...billItems,
      { id: "", Name: "", Quantity: 0, Price: 0, Total: 0 },
    ];
    setNewBillItems(newBillItems);
  };


  const clearBillItems = () => {
    setBillItems([]);
    setGrandTotal(0);
  };

  const removeBillItem = useCallback((index) => {
    setNewBillItems(billItems.filter((o, i) => index !== i));
    setItemChild([])
  }, [billItems]);

  const getListLength = () => {
    return billItems.length;
  };

  return (
    <div className="Billing">
      <div className="billingContent">
        <BillingControl
          addBillObject={addBillObject}
          clearBillItems={clearBillItems}
          removeBillItem={removeBillItem}
          getListLength={getListLength}
          scrollToBottom={scrollToBottom}
        />
        <BillingHead />
        <div className="bill-items">
          {itemChild}
          <div ref={elementRef} />
        </div>
        <BillingFoot grandTotal={grandTotal}/>
      </div>
    </div>
  );
}

export default Billing;
