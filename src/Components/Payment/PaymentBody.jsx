import "./Payment.css";
import PaymentItem from "./PaymentItem";

function PaymentBody({ paymentList }) {
  return (
    <div className="PaymentBody">
      {paymentList.length !== 0 ? (
        paymentList.map((item) => {
          return (
            <PaymentItem
              key={item._id}
              data={{
                name: item.name,
                phone: item.phone,
                balance: item.balance,
                id: item._id,
              }}
            />
          );
        })
      ) : (
        <div className="noPayment">No Payment Available</div>
      )}
    </div>
  );
}

export default PaymentBody;
