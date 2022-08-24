import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";

import "../styles/Timer.css";

const Timer = ({ time, handleTime }) => {
  const { handleUser, handleSubmitted } = useContext(AppContext);

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
  }, [time, handleTime, handleUser, handleSubmitted]);

  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  // Create time string
  timer = `${min}:${sec}`;

  return (
    <>
      <p className="logout-timer">
        You will be logged out in{" "}
        <span
          className={`${time < (initialTime * 1) / 10 ? "timer-end" : "timer"}`}
        >
          {timer}
        </span>
      </p>
    </>
  );
};

export default Timer;
