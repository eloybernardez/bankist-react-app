import React from "react";
import { Formik, Form, Field } from "formik";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/OperationItem.css";
import useGetUsers from "../hooks/useGetUsers";

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

const OperationItem = ({ type }) => {
  const [transferAccount, setTransferAccount] = React.useState({});
  const { currentAccount, createUserName, handleUser, fullBalance } =
    useContext(AppContext);
  const { accounts, setAccounts } = useGetUsers();

  const handleTransferUser = (newUser) => {
    setTransferAccount(newUser);
  };

  let newCurrentAccount;

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

              handleTransferUser(
                accounts.find((account) => {
                  return (
                    createUserName(account) === values.username &&
                    createUserName(account) !== createUserName(currentAccount)
                  );
                })
              );

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
            onSubmit={(values, { resetForm }) => {
              // form handler
              newCurrentAccount = currentAccount;
              const newTransferAccount = transferAccount;

              newCurrentAccount.movements.push(-Number(values.amount));
              newCurrentAccount.movementsDates.push(new Date().toISOString());
              newTransferAccount.movements.push(Number(values.amount));
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
              resetForm();

              // Communicate to the user that the transfer has been done
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
              } else if (
                !currentAccount.movements.some(
                  (mov) => mov >= Number(values.amount) * 0.1
                )
              ) {
                errors.amount = "You need to have at least 10% of your balance";
              }

              return errors;
            }}
            onSubmit={(values) => {
              newCurrentAccount = currentAccount;
              setTimeout(() => {
                newCurrentAccount.movements.push(Number(values.amount));

                newCurrentAccount.movementsDates.push(new Date().toISOString());
                handleUser({
                  ...currentAccount,
                  movements: newCurrentAccount.movements,
                  movementsDates: newCurrentAccount.movementsDates,
                });

                alert(`You received ${values.amount}.`);
              }, 3000);
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
            onSubmit={(values, { resetForm }) => {
              const index = accounts.findIndex(
                (account) => createUserName(account) === values.username
              );

              // Logout
              const newAccounts = accounts;
              newAccounts.splice(index, 1);
              console.log(newAccounts);

              setAccounts(newAccounts);
              alert(`You closed your account.`);

              resetForm();
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
