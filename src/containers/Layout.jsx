import React from "react";
import Header from "../components/Header";
import Movements from "../containers/Movements";
import Operations from "../containers/Operations";
import Balance from "../components/Balance";
import Summary from "../components/Summary";
import Timer from "../components/Timer";
import OperationItem from "../components/OperationItem";
import AppContext from "../context/AppContext";
import "../styles/Layout.css";

const Layout = () => {
  const { submitted } = React.useContext(AppContext);
  return (
    <>
      <Header />

      <main className={`app ${submitted ? "show" : "hide"}`}>
        {submitted && (
          <>
            <Balance />
            <Movements />
            <Summary />
            <Operations>
              <OperationItem type="transfer" />
              <OperationItem type="loan" />
              <OperationItem type="close" />
            </Operations>

            <Timer />
          </>
        )}
      </main>
    </>
  );
};

export default Layout;
