import React, { useContext } from "react";
import { Formik } from "formik";
import Logo from "../assets/images/logo.png";
import AccountsContext from "../context/AccountsContext";
import AppContext from "../context/AppContext";
import "../styles/Header.css";

const Header = ({ submitted, handleSubmitted }) => {
  const { currentAccount, handleUser, createUserName } = useContext(AppContext);
  const { accounts } = useContext(AccountsContext);

  const correctUser = (acc) => {
    return accounts.find(
      (account) =>
        createUserName(account) === acc.user &&
        Number(acc.password) === account.pin
    );
  };

  return (
    <nav>
      <p className="welcome">
        {!submitted
          ? "Log in to get started"
          : `Welcome, ${currentAccount.owner.split(" ")[0]} 🤗`}
      </p>
      <img src={Logo} alt="Logo" className="logo" />
      <Formik
        initialValues={{ user: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.user) {
            errors.user = "Required";
          } else if (!correctUser(values)) {
            errors.user = "Invalid user or password";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleUser(correctUser(values));

          setSubmitting(false);
          handleSubmitted();
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleReset,
          isSubmitting,
          isValid,
        }) => (
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__inputs__container">
              <input
                type="text"
                name="user"
                placeholder="user"
                className={`login__input login__input--user ${
                  touched.user && !isValid ? "login__input--error" : ""
                } `}
                onChange={handleChange}
                value={values.user}
              />

              <input
                type="password"
                name="password"
                placeholder="PIN"
                maxLength={4}
                className={`login__input login__input--pin ${
                  touched.user && !isValid ? "login__input--error" : ""
                } `}
                onChange={handleChange}
                value={values.password}
              />
              <div className="invalid-form">
                {errors.user && touched.user && errors.user}
              </div>
            </div>

            <button
              type="submit"
              className="login__btn"
              disabled={isSubmitting}
              onReset={handleReset}
            >
              ⮞
            </button>
          </form>
        )}
      </Formik>
    </nav>
  );
};

export default Header;
