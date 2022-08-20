import React from "react";
import "../styles/Operations.css";

const Operations = (props) => {
  return (
    <div className="operation-container">
      {props.renderMov("transfer")}
      {props.renderMov("loan")}
      {props.renderMov("close")}
    </div>
  );
};

export default Operations;
