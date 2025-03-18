import React from "react";
import "./DeleteCardModal.css";

function DeleteCardModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete__card-modal">
        <button
          type="button"
          onClick={onConfirm}
          className="delete__card-heading"
        >
          Remove from saved
        </button>
      </div>
    </div>
  );
}

export default DeleteCardModal;
