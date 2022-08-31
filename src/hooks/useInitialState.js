import { useState } from "react";

const useInitialState = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    loading,
    setLoading,
    showModal,
    setShowModal,
  };
};

export default useInitialState;
