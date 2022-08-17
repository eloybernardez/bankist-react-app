import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";

import "../styles/Timer.css";

const Timer = () => {
  const { time, handleTime } = useContext(AppContext);

  const startLogOutTimer = function () {
    const tick = function () {
      // When 0 seconds, stop timer and log out user
      if (time === 0) {
        console.log("Logging out user...");
        // labelWelcome.textContent = "Log in to get started";
        // containerApp.style.opacity = 0;
      }

      // Decrease 1s
      handleTime();
    };
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // Call the timer every second
    tick();

    return `${min}:${sec}`;
  };

  return (
    <>
      <p className="logout-timer">
        You will be logged out in{" "}
        <span className="timer">{startLogOutTimer()}</span>
      </p>
    </>
  );
};

export default Timer;
