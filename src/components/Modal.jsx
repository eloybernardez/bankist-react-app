import React from "react";
import "../styles/Modal.css";

const Modal = ({ setShowModal, operationText }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h3 className="modal-title">Operation done ✅</h3>
        <p className="modal-text">{operationText}</p>
        <button className="modal-button" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
