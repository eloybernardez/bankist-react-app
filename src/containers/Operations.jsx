import React from "react";
import OperationItem from "../components/OperationItem";
import "../styles/Operations.css";

const Operations = () => {
  return (
    <div className="operation-container">
      <OperationItem type={"transfer"} />
      <OperationItem type={"loan"} />
      <OperationItem type={"close"} />
    </div>
  );
};

export default Operations;
