import React from "react";
import TransferOperation from "./TransferOperation";
import LoanOperation from "./LoanOperation";
import CloseAccount from "./CloseAccount";
import "../styles/OperationItem.css";

function validateAmount(value) {
  let error;
  if (value < 0) {
    error = "Amount must be positive";
  }
  return error;
}

function validatePin(user, pin) {
  let error;
  if (pin !== user.pin) {
    error = "Wrong PIN";
  }
  return error;
}

function validateUsername(userValue, value) {
  let error;
  if (value !== userValue) {
    error = "Wrong user!";
  }
  return error;
}

const OperationItem = ({ type }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (type === "transfer") {
    return (
      <TransferOperation
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        validateAmount={validateAmount}
        validateUsername={validateUsername}
      />
    );
  } else if (type === "loan") {
    return (
      <LoanOperation
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        validateAmount={validateAmount}
      />
    );
  } else {
    return (
      <CloseAccount
        showModal={showModal}
        setShowModal={setShowModal}
        validateUsername={validateUsername}
        validatePin={validatePin}
      />
    );
  }
};

export default OperationItem;
