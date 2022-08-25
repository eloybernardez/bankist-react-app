import React from "react";
import Movements from "../containers/Movements";
import Operations from "../containers/Operations";
import Balance from "../components/Balance";
import Summary from "../components/Summary";
import Timer from "../components/Timer";
import useTime from "../hooks/useTime";
import AppContext from "../context/AppContext";
import TimeContext from "../context/TimeContext";
import TransferOperation from "../components/TransferOperation";
import LoanOperation from "../components/LoanOperation";
import CloseAccount from "../components/CloseAccount";

const Main = () => {
  const { submitted } = React.useContext(AppContext);
  const initialTime = useTime();
  return (
    <main className={`app ${submitted ? "show" : "hide"}`}>
      {submitted && (
        <>
          <Balance />
          <Movements />
          <Summary />
          <TimeContext.Provider value={initialTime}>
            <Operations>
              <TransferOperation />
              <LoanOperation />
              <CloseAccount />
            </Operations>

            <Timer />
          </TimeContext.Provider>
        </>
      )}
    </main>
  );
};

export default Main;
