import React, { useState, useEffect } from "react";
import "./SignOutModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignOutModal({ onClose, isOpen, onSignOut }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="sign-out">
        <div className="sign-out__container">
          <h1 className="sign-out__title">Are you sure you want to log out?</h1>
          <div className="sign-out__buttons">
            <button onClick={onSignOut} className="sign-out__yes">
              Sign Out
            </button>
            <button onClick={onClose} className="sign-out__cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOutModal;
