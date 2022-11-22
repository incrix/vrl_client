import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Billing.css";
import BillingControl from "./BillingControl";
import BillingHead from "./BillingHead";
import BillItem from "./BillItem";
import BillingFoot from "./BillingFoot";
import VerifyAdmin from "../VerifyAdmin";
import PopUp from "../PopUp";

function Billing() {
  const [billItems, setBillItems] = useState([]);
  const [newBillItems, setNewBillItems] = useState(billItems);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [itemChild, setItemChild] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [amountPaid, setAmountPaid] = useState("");
  const elementRef = useRef(null);
  const [isAlert, setIsAlert] = useState(false);
  const [alertProp, setAlertProp] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isValid) => {
      if (!isValid || isValid instanceof Error) {
        navigate("/login");
      }
    });
    // eslint-disable-next-line
  }, []);
  window.onbeforeunload = function(e) {
    return 'Are you sure you want to refresh?';
  };
  useEffect(() => {
    scrollToBottom();
    const value = billItems.reduce((acc, item) => acc + item.total, 0);
    setGrandTotal(value);
  }, [billItems]);

  useEffect(() => {
    setBillItems(newBillItems);
  }, [newBillItems]);

  useEffect(() => {
    const list = billItems.map((billItem, index) => {
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
    });
    list.reverse();
    setItemChild(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billItems]);

  const scrollToBottom = () => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBillObject = () => {
    const newBillItems = [
      ...billItems,
      { productId: "", productName: "", quantity: "", price: "", total: 0 },
    ];
    setNewBillItems(newBillItems);
  };

  const clearBillItems = () => {
    getWarningPopup("Bill Cleared", [
      { name: "Cancel", primary: false, action: () => setIsAlert(false) },
      {
        name: "Clear",
        primary: true,
        action: () => {
          setBillItems([]);
          setGrandTotal(0);
          setIsAlert(false);
        },
      },
    ]);
  };

  const removeBillItem = useCallback(
    (index) => {
      setNewBillItems(billItems.filter((o, i) => index !== i));
      setItemChild([]);
    },
    [billItems]
  );

  const getListLength = () => {
    return billItems.length;
  };

  const onRiseInvoice = () => {
    if (
      phone === "" ||
      name === "" ||
      amountPaid === "" ||
      billItems.length === 0
    ) {
      getFailedPopup("Please fill all the fields");
      return;
    }
    const orderList = billItems;
    for (let index = 0; index < orderList.length; index++) {
      const element = orderList[index];
      if (
        element.productName === "" ||
        element.quantity === "" ||
        element.price === ""
      ) {
        getFailedPopup("Product list is not filled properly");
        return;
      }
    }
    const data = JSON.stringify({
      phone,
      name,
      paidAmount: amountPaid,
      orderList,
    });
    console.log(data);
    fetch(`${global.config.ROOT_URL}purchase/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          getSuccessPopup(
            "Invoice Raised Successfully InvoicesId: " + data.data.purchaseId
          );
          setBillItems([]);
          setAmountPaid("");
          setPhone("");
          setName("");
          setNewBillItems([]);
        } else {
          getFailedPopup(data.message);
        }
      })
      .catch((error) => {
        getFailedPopup(error.message);
      });
  };
  const getWarningPopup = (
    message,
    buttonProperty = [
      { name: "Ok", primary: true, action: () => setIsAlert(false) },
    ]
  ) => {
    setIsAlert(true);
    const popup = {
      status: "Warning",
      message: message,
      buttonProperty,
    };
    setAlertProp(popup);
  };

  const getSuccessPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Success",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
  };

  const getFailedPopup = (message) => {
    setIsAlert(true);
    const popup = {
      status: "Failed",
      message: message,
      buttonProperty: [
        {
          name: "Ok",
          primary: true,
          action: () => setIsAlert(false),
        },
      ],
    };
    setAlertProp(popup);
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
          phoneState={[phone, setPhone]}
          nameState={[name, setName]}
        />
        <BillingHead />
        <div className="bill-items">{itemChild}</div>
        <BillingFoot
          grandTotal={grandTotal}
          amountPaidState={{ amountPaid, setAmountPaid }}
          onRiseInvoice={onRiseInvoice}
        />
      </div>
      {isAlert ? <PopUp popup={alertProp} /> : ""}
    </div>
  );
}

export default Billing;
