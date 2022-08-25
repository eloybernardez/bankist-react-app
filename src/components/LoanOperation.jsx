import React, { useContext } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { Formik, Form, Field } from "formik";
import AccountsContext from "../context/AccountsContext";
import AppContext from "../context/AppContext";

const LoanOperation = ({
  validateAmount,
  showModal,
  setShowModal,
  loading,
  setLoading,
}) => {
  let newCurrentAccount;
  const { currentAccount, handleUser } = useContext(AccountsContext);
  const { handleTime } = useContext(AppContext);

  return (
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
            !currentAccount.movements.some((mov) => {
              if (mov > 0) return mov * 0.1 >= Number(values.amount);
            })
          ) {
            errors.amount = "You need to have at least 10% of any deposit";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          newCurrentAccount = currentAccount;
          setLoading(true);

          // Loan request
          setTimeout(() => {
            newCurrentAccount.movements.push(Number(values.amount));

            newCurrentAccount.movementsDates.push(new Date().toISOString());
            handleUser({
              ...currentAccount,
              movements: newCurrentAccount.movements,
              movementsDates: newCurrentAccount.movementsDates,
            });

            // Add modal to show that the loan has been confirmed
            setLoading(false);
            setShowModal(true);
          }, 3000);

          // Reset the timer
          setTimeout(() => {
            handleTime(120);
          }, 1000);

          resetForm();
        }}
      >
        {({ errors, touched, newCurrentAccount = currentAccount }) => (
          <Form className={`form form--loan`}>
            <Field
              name="amount"
              className={`form__input form__input--loan-amount ${
                touched.amount && errors.amount ? "form__input--error" : ""
              }`}
              placeholder="Amount"
            />

            <button type="submit" className={`form__btn form__btn--loan`}>
              ⮞
            </button>

            <div className="error-message">
              {errors.amount && touched.amount && errors.amount}
            </div>

            {!showModal && loading && <Spinner />}

            {showModal && (
              <Modal
                setShowModal={setShowModal}
                operationText={`You have received ${newCurrentAccount?.movements?.at(
                  -1
                )} successfully!`}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoanOperation;
