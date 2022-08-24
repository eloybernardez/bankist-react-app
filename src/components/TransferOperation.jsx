import React, { useContext } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";
import AppContext from "../context/AppContext";
import { Formik, Form, Field } from "formik";

const TransferOperation = ({
  currentAccount,
  accounts,
  createUserName,
  handleUser,
  showModal,
  setShowModal,
  loading,
  setLoading,
  handleTime,
  validateAmount,
  validateUsername,
}) => {
  const [transferAccount, setTransferAccount] = React.useState({});
  const { fullBalance } = useContext(AppContext);

  const handleTransferUser = (newUser) => {
    setTransferAccount(newUser);
  };

  let newCurrentAccount;
  let newTransferAccount;
  return (
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
          newCurrentAccount = currentAccount;
          newTransferAccount = transferAccount;
          setLoading(true);

          // Transfer money
          setTimeout(() => {
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

            // Communicate to the user that the transfer has been done
            setLoading(false);
            setShowModal(true);
          }, 3000);

          // Reset the timer
          setTimeout(() => {
            handleTime(120);
          }, 1000);

          // Reset form
          resetForm();
        }}
      >
        {({
          errors,
          touched,
          values,
          newTransferAccount = transferAccount,
        }) => (
          <Form className={`form form--transfer`}>
            <Field
              name="username"
              className={`form__input form__input--to ${
                touched.username && errors.username ? "form__input--error" : ""
              }`}
              placeholder="User"
            />
            <Field
              name="amount"
              className={`form__input form__input--amount ${
                touched.amount && errors.amount ? "form__input--error" : ""
              }`}
              placeholder="Amount"
            />
            <button type="submit" className={`form__btn form__btn--transfer`}>
              ⮞
            </button>
            <div className="error-message">
              {errors.username && touched.username && errors.username}
            </div>
            <div className="error-message">
              {errors.amount && touched.amount && errors.amount}
            </div>

            {!showModal && loading && <Spinner />}

            {showModal && (
              <Modal
                setShowModal={setShowModal}
                operationText={`You have transfered ${newTransferAccount?.movements?.at(
                  -1
                )} to ${newTransferAccount?.owner} successfully!`}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransferOperation;
