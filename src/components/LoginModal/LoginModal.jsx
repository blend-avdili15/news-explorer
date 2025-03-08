import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ email: "", password: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(formData)
      .then(() => onClose())
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input modal__input_login-email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="login-email-error" />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input modal__input_login_password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="login-password-error" />
      </label>

      <button
        type="button"
        className="modal__switch-button"
        onClick={onSwitchToRegister}
      >
        or <span className="modal__switch-text">Sign up</span>
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
