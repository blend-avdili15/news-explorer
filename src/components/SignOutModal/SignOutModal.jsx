import React, { useState, useEffect } from "react";
import "./SignOutModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignOutModal({ onClose, isOpen, onSignOut }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="sign-out-modal">
        <div className="sign-out-container">
          <h2 className="sign-out-title">Are you sure you want to log out?</h2>
          <div className="sign-out-buttons">
            <button onClick={onSignOut} className="sign-out-yes">
              Sign Out
            </button>
            <button onClick={onClose} className="sign-out-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOutModal;
