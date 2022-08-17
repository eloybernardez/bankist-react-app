import React from "react";
import AppContext from "../context/AppContext";
import "../styles/Balance.css";

const Balance = () => {
  const { currentAccount, formatCur, fullBalance } =
    React.useContext(AppContext);

  const formattedBalance = formatCur(
    fullBalance,
    currentAccount.locale,
    currentAccount.currency
  );

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const currentDate = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);

  return (
    <>
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{currentDate}</span>
          </p>
        </div>
        <p className="balance__value">{formattedBalance}</p>
      </div>
    </>
  );
};

export default Balance;
