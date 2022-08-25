import { useState } from "react";

const useInitialState = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sorted, setSorted] = useState(false);

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
  };
};

export default useInitialState;
