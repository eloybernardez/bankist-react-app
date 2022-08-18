import React, { useContext } from "react";
import { Formik } from "formik";
import Logo from "../assets/images/logo.png";
import useGetUsers from "../hooks/useGetUsers";
import AppContext from "../context/AppContext";
import "../styles/Header.css";

const Header = () => {
  const {
    currentAccount,
    handleUser,
    handleSubmitted,
    submitted,
    createUserName,
  } = useContext(AppContext);
  const { accounts } = useGetUsers();

  return (
    <nav>
      <p className="welcome">
        {!submitted
          ? "Log in to get started"
          : `Welcome, ${currentAccount.owner.split(" ")[0]}`}
      </p>
      <img src={Logo} alt="Logo" className="logo" />
      <Formik
        initialValues={{ user: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.user) {
            errors.user = "Required";
          } else if (
            !accounts.find(
              (account) =>
                createUserName(account) === values.user &&
                Number(values.password) === account.pin
            )
          ) {
            errors.user = "Invalid user or password";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleUser(
            accounts.find(
              (account) =>
                createUserName(account) === values.user &&
                Number(values.password) === account.pin
            )
          );

          setSubmitting(false);
          handleSubmitted(true);
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
        }) => (
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__inputs__container">
              <input
                type="text"
                name="user"
                placeholder="user"
                className="login__input login__input--user"
                onChange={handleChange}
                value={values.user}
              />

              <input
                type="password"
                name="password"
                placeholder="PIN"
                maxLength={4}
                className="login__input login__input--pin"
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
              →
            </button>
          </form>
        )}
      </Formik>
    </nav>
  );
};

export default Header;
