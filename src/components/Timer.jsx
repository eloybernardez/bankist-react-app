import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import AccountsContext from "../context/AccountsContext";
import TimeContext from "../context/TimeContext";

import "../styles/Timer.css";

const Timer = () => {
  const { handleSubmitted } = useContext(AppContext);
  const { handleUser } = useContext(AccountsContext);
  const { handleTime, time } = useContext(TimeContext);

  let timer;
  const initialTime = 120;

  React.useEffect(() => {
    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      // Change account
      handleUser({});

      // Log out user
      handleSubmitted();
    }
    // Decrease 1s
    const timeId = setTimeout(() => {
      if (time <= 0) {
        // Reset timer
        handleTime(initialTime);
      } else if (time > 0) {
        // Continue countdown...
        handleTime(time);
      }
    }, 1000);

    if (time > 0) return () => clearTimeout(timeId);
  }, [time]);

  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  // Create time string
  timer = `${min}:${sec}`;

  return (
    <div className="logout">
      <p className="logout__timer">
        You will be logged out in{" "}
        <span
          className={`${time < (initialTime * 1) / 10 ? "timer-end" : "timer"}`}
        >
          {timer}
        </span>
      </p>
      <button
        className="logout__button"
        onClick={() => {
          handleSubmitted();
          handleTime(initialTime);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Timer;
