import React from "react";
import { useState } from "react";

const account1 = {
  owner: "Eloy Bernardez",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "ARS",
  locale: "es-AR", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

const useInitialState = () => {
  const [currentAccount, setCurrentAccount] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [time, setTime] = React.useState(1200);

  const handleUser = (newUser) => {
    setCurrentAccount(newUser);
  };

  const handleSorted = () => {
    setSorted(!sorted);
  };

  const handleTime = () => {
    setTime((time) => time - 1);
  };

  const handleSubmitted = () => {
    setSubmitted(true);
  };

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const createUserName = (account) => {
    return account?.owner
      .toLowerCase()
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
    accounts,
    formatCur,
    sorted,
    handleSorted,
    time,
    handleTime,
    createUserName,
    fullBalance,
  };
};

export default useInitialState;
