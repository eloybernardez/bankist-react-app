import { useState } from "react";

const useInitialState = () => {
  const [currentAccount, setCurrentAccount] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sorted, setSorted] = useState(false);

  const handleUser = (newUser) => {
    setCurrentAccount(newUser);
  };

  const handleSorted = () => {
    setSorted((sorted) => !sorted);
  };

  const handleSubmitted = () => {
    setSubmitted((submitted) => !submitted);
  };

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const createUserName = (account) => {
    return account?.owner
      ?.toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  };

  const fullBalance = currentAccount.movements?.reduce(
    (totalAmount, currentMovement) => {
      return totalAmount + currentMovement;
    },
    0
  );

  return {
    currentAccount,
    handleUser,
    submitted,
    handleSubmitted,
    formatCur,
    sorted,
    handleSorted,
    createUserName,
    fullBalance,
  };
};

export default useInitialState;
