import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, onSignUp, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setFormData({ email: "", password: "", username: "" });
    setEmailError("");
    setEmailTouched(false);
    setFormError("");
  }, [isOpen]);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
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
    setFormError("");

    onSignUp(formData)
      .then(() => onClose())
      .catch((err) => {
        setFormError("This email is not available");
      });
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
          onBlur={handleBlur}
          required
        />
        {emailError && emailTouched && (
          <span className="modal__error" id="register-email-error">
            {emailError}
          </span>
        )}
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

      {formError && <div className="modal__error_visible">{formError}</div>}

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
