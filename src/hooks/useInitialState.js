import React, { useState } from "react";

const useInitialState = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [time, setTime] = React.useState(120);

  const handleTime = (time) => {
    setTime(time - 1);
  };

  const handleSorted = () => {
    setSorted((sorted) => !sorted);
  };

  const handleSubmitted = () => {
    setSubmitted((submitted) => !submitted);
  };

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return {
    submitted,
    handleSubmitted,
    formatCur,
    sorted,
    handleSorted,
    time,
    handleTime,
  };
};

export default useInitialState;
