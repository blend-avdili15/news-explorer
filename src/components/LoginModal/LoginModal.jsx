import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, onSwitchToRegister, onSignIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    setFormData({ email: "", password: "" });
    setEmailError("");
    setEmailTouched(false);
  }, [isOpen]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === "email") {
      setEmailTouched(true);
    }
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
          onBlur={handleBlur}
          required
        />
        {emailError && emailTouched && (
          <span className="modal__error" id="login-email-error">
            {emailError}
          </span>
        )}
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
