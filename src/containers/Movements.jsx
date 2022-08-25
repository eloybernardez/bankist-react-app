import React from "react";
import MovementItem from "../components/MovementItem";
import AppContext from "../context/AppContext";
import AccountsContext from "../context/AccountsContext";
import "../styles/Movements.css";

const Movements = () => {
  const { sorted } = React.useContext(AppContext);
  const { currentAccount } = React.useContext(AccountsContext);

  const FinalMovements = () =>
    !sorted
      ? currentAccount.movements
          .map((movementAmount, index) => (
            <MovementItem
              key={index}
              currentAccount={currentAccount}
              movementAmount={movementAmount}
            />
          ))
          .reverse()
      : currentAccount.movements.map((movementAmount, index) => (
          <MovementItem
            key={index}
            currentAccount={currentAccount}
            movementAmount={movementAmount}
          />
        ));
  return (
    <>
      <div className="movements">
        <FinalMovements />
      </div>
    </>
  );
};

export default Movements;
