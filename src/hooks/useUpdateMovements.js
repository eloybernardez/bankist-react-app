import React from "react";
import AppContext from "../context/AppContext";

const useUpdateMovements = (amount, reseter) => {
  const { handleUser, currentAccount, transferAccount, handleTransferUser } =
    React.useContext(AppContext);

  React.useEffect(() => {
    const newCurrentAccount = currentAccount;
    const newTransferAccount = transferAccount;

    newCurrentAccount.movements.push(-Number(amount));
    newCurrentAccount.movementsDates.push(new Date().toISOString());
    newTransferAccount.movements.push(Number(amount));
    newTransferAccount.movementsDates.push(new Date().toISOString());

    // Doing the transfer and updating the accounts
    handleUser({
      ...currentAccount,
      movements: newCurrentAccount.movements,
      movementsDates: newCurrentAccount.movementsDates,
    });

    handleTransferUser({
      ...transferAccount,
      movements: newTransferAccount.movements,
      movementsDates: newTransferAccount.movementsDates,
    });

    // Reset form
    reseter();
  }, [transferAccount, currentAccount]);
};

export default useUpdateMovements;
