import React from "react";

const useTime = () => {
  const [time, setTime] = React.useState(120);

  const handleTime = (time) => {
    setTime(time - 1);
  };
  return { time, handleTime };
};

export default useTime;
