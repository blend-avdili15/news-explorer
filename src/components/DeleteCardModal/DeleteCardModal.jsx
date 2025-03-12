import React from "react";
import "./DeleteCardModal.css";

function DeleteCardModal({ isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete__card-modal">
        <p className="delete__card-heading">Remove from saved</p>
        {/* <button onClick={onClose} className="delete__card-close">
          Cancel
        </button>{" "} */}

        {/* <button
          onClick={() => console.log("Deleting...")}
          className="delete__card-confirm"
        >
          Confirm
        </button> */}
      </div>
    </div>
  );
}

export default DeleteCardModal;
