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
  const { submitted, handleSubmitted } = React.useContext(AppContext);
  return (
    <>
      <Header submitted={submitted} handleSubmitted={handleSubmitted} />
      <main className="app">
        {submitted && (
          <>
            <Balance />
            <Movements />
            <Summary />
            <Operations
              renderMov={(type) => (
                <OperationItem type={type} handleSubmitted={handleSubmitted} />
              )}
            />
            {/* <Timer /> */}
          </>
        )}
      </main>
    </>
  );
};

export default Layout;
