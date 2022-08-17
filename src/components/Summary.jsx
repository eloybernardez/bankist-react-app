import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/Summary.css";

const Summary = () => {
  const { currentAccount, handleSorted, formatCur } = useContext(AppContext);

  const incomes = currentAccount.movements
    .filter((mov) => mov > 0)
    .reduce((currentAccount, mov) => currentAccount + mov, 0);

  const out = currentAccount.movements
    .filter((mov) => mov < 0)
    .reduce((currentAccount, mov) => currentAccount + mov, 0);

  const interest = currentAccount.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * currentAccount.interestRate) / 100)
    .filter((int) => {
      return int >= 1;
    })
    .reduce((currentAccount, int) => currentAccount + int, 0);
  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">
        {formatCur(incomes, currentAccount.locale, currentAccount.currency)}
      </p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">
        {formatCur(
          Math.abs(out),
          currentAccount.locale,
          currentAccount.currency
        )}
      </p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        {formatCur(interest, currentAccount.locale, currentAccount.currency)}
      </p>
      <button type="button" className="btn--sort" onClick={handleSorted}>
        ⮁ Sort
      </button>
    </div>
  );
};

export default Summary;
