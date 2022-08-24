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
  const [time, setTime] = React.useState(120);
  const { submitted, handleSubmitted } = React.useContext(AppContext);

  const handleTime = (time) => {
    setTime(time - 1);
  };

  return (
    <>
      <Header submitted={submitted} handleSubmitted={handleSubmitted} />

      <main className={`app ${submitted ? "show" : "hide"}`}>
        {submitted && (
          <>
            <Balance />
            <Movements />
            <Summary />
            <Operations
              renderMov={(type) => (
                <OperationItem
                  type={type}
                  handleSubmitted={handleSubmitted}
                  setTime={setTime}
                  handleTime={handleTime}
                />
              )}
            />
            <Timer time={time} handleTime={handleTime} />
          </>
        )}
      </main>
    </>
  );
};

export default Layout;
