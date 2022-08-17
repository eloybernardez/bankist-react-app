import React from "react";
import { Formik, Form, Field } from "formik";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/OperationItem.css";
import { useEffect } from "react";

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

const transfer = (amount, fromAccount, toAccount) => {
  if (
    amount > 0 &&
    toAccount &&
    fromAccount.balance >= amount &&
    toAccount?.username !== fromAccount.username
  ) {
    // Doing the transfer
    fromAccount.movements.push(-amount);
    toAccount.movements.push(amount);

    // Add transfer date
    fromAccount.movementsDates.push(new Date().toISOString());
    toAccount.movementsDates.push(new Date().toISOString());
  }
};

const OperationItem = ({ type }) => {
  const { accounts, currentAccount, createUserName, fullBalance } =
    useContext(AppContext);

  let transferAccount;

  if (type === "transfer") {
    return (
      <>
        <div className={`operation operation--transfer`}>
          <h2>Transfer money</h2>

          <Formik
            initialValues={{
              username: "",
              amount: "",
            }}
            validate={(values) => {
              const errors = {};

              transferAccount = accounts.find((account) => {
                return (
                  createUserName(account) === values.username &&
                  createUserName(account) !== createUserName(currentAccount)
                );
              });

              if (!values.username) {
                errors.username = "Required";
              } else if (createUserName(transferAccount) !== values.username) {
                errors.username = validateUsername(
                  createUserName(transferAccount),
                  values.username
                );
              }

              if (!Number(values.amount)) {
                errors.amount = "Required";
              } else if (Number(values.amount) < 0) {
                errors.amount = validateAmount(Number(values.amount));
              } else if (Number(values.amount) > fullBalance) {
                errors.amount = "Amount must be less than your balance";
              }

              return errors;
            }}
            onSubmit={(values) => {
              transferAccount = accounts.find((account) => {
                return (
                  createUserName(account) === values.username &&
                  createUserName(account) !== createUserName(currentAccount)
                );
              });

              // Doing the transfer
              transferAccount.movements.push(Number(values.amount));
              currentAccount.movements.push(-Number(values.amount));

              // Add transfer date
              transferAccount.movementsDates.push(new Date().toISOString());
              currentAccount.movementsDates.push(new Date().toISOString());

              alert(
                `You transfered ${values.amount} to ${transferAccount.owner}`
              );
            }}
          >
            {({ errors, touched }) => (
              <Form className={`form form--transfer`}>
                <Field
                  name="username"
                  className="form__input form__input--to"
                  placeholder="User"
                />

                <Field
                  name="amount"
                  className="form__input form__input--amount"
                  placeholder="Amount"
                />

                <button
                  type="submit"
                  className={`form__btn form__btn--transfer`}
                >
                  ⮞
                </button>
                <div className="error-message">
                  {errors.username && touched.username && errors.username}
                </div>

                {errors.amount && touched.amount && (
                  <div className="error-message">{errors.amount}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  } else if (type === "loan") {
    return (
      <>
        <div className="operation operation--loan">
          <h2>Request loan</h2>

          <Formik
            initialValues={{
              amount: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!Number(values.amount)) {
                errors.amount = "Required";
              } else if (Number(values.amount) < 0) {
                errors.amount = validateAmount(Number(values.amount));
              }

              return errors;
            }}
            onSubmit={(values) => {
              alert(`You received ${values.amount}.`);
            }}
          >
            {({ errors, touched }) => (
              <Form className={`form form--loan`}>
                <Field
                  name="amount"
                  className="form__input form__input--loan-amount"
                  placeholder="Amount"
                />

                <button type="submit" className={`form__btn form__btn--loan`}>
                  ⮞
                </button>
                {errors.amount && touched.amount && (
                  <div className="error-message">{errors.amount}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="operation operation--close">
          <h2>Close account</h2>

          <Formik
            initialValues={{
              username: "",
              pin: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.username) {
                errors.username = "Required";
              } else if (createUserName(currentAccount) !== values.username) {
                errors.username = validateUsername(
                  createUserName(currentAccount),
                  values.username
                );
              }

              if (!values.pin) {
                errors.pin = "Required";
              } else if (Number(values.pin) !== currentAccount.pin) {
                errors.pin = validatePin(currentAccount, Number(values.pin));
              }

              return errors;
            }}
            onSubmit={(values) => {
              alert(`You closed your account.`);
              // Logout
            }}
          >
            {({ errors, touched }) => (
              <Form className="form form--close">
                <Field
                  name="username"
                  className="form__input form__input--user"
                  placeholder="User"
                />

                <Field
                  name="pin"
                  type="password"
                  maxLength={4}
                  className="form__input form__input--pin"
                  placeholder="PIN"
                />

                <button type="submit" className="form__btn form__btn--close">
                  ⮞
                </button>
                <div className="error-message">
                  {errors.username && touched.username && errors.username}
                </div>

                {errors.pin && touched.pin && (
                  <div className="error-message">{errors.pin}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
};

export default OperationItem;
