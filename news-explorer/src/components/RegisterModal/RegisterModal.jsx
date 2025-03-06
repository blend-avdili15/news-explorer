import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, onSignUp, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    setFormData({ email: "", password: "", username: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(formData)
      .then(() => onClose())
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input modal__input_register_email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-email-error" />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input modal__input_register_password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-password-error" />
      </label>
      <label className="modal__label">
        Username{" "}
        <input
          type="username"
          name="username"
          className="modal__input modal__input_register_username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-username-error" />
      </label>
      <div className="modal__button-container">
        <button
          type="button"
          className="modal__switch-button"
          onClick={onSwitchToLogin}
        >
          or <span className="modal__switch-text">Sign in</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
