import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import AccountsContext from "../context/AccountsContext";
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

const OperationItem = ({ type, handleSubmitted, handleTime }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { currentAccount, createUserName, handleUser } = useContext(AppContext);
  const { accounts, handleAccounts } = useContext(AccountsContext);

  if (type === "transfer") {
    return (
      <TransferOperation
        currentAccount={currentAccount}
        accounts={accounts}
        createUserName={createUserName}
        handleUser={handleUser}
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        handleTime={handleTime}
        validateAmount={validateAmount}
        validateUsername={validateUsername}
      />
    );
  } else if (type === "loan") {
    return (
      <LoanOperation
        currentAccount={currentAccount}
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        handleTime={handleTime}
        handleUser={handleUser}
        validateAmount={validateAmount}
      />
    );
  } else {
    return (
      <CloseAccount
        accounts={accounts}
        currentAccount={currentAccount}
        createUserName={createUserName}
        validateUsername={validateUsername}
        validatePin={validatePin}
        handleAccounts={handleAccounts}
        handleUser={handleUser}
        handleSubmitted={handleSubmitted}
        handleTime={handleTime}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    );
  }
};

export default OperationItem;
