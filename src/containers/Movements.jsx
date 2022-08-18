import React from "react";
import MovementItem from "../components/MovementItem";
import AppContext from "../context/AppContext";
import "../styles/Movements.css";

const Movements = () => {
  const { currentAccount, sorted } = React.useContext(AppContext);
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
