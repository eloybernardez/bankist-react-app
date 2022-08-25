import React from "react";
import MovementItem from "../components/MovementItem";
import AppContext from "../context/AppContext";
import AccountsContext from "../context/AccountsContext";
import "../styles/Movements.css";

const Movements = () => {
  const { sorted } = React.useContext(AppContext);
  const { currentAccount } = React.useContext(AccountsContext);
  return (
    <>
      <div className="movements">
        {!sorted &&
          currentAccount.movements
            .map((movementAmount, index) => (
              <MovementItem
                key={index}
                currentAccount={currentAccount}
                movementAmount={movementAmount}
              />
            ))
            .reverse()}
        {sorted &&
          currentAccount.movements.map((movementAmount, index) => (
            <MovementItem
              key={index}
              currentAccount={currentAccount}
              movementAmount={movementAmount}
            />
          ))}
      </div>
    </>
  );
};

export default Movements;
