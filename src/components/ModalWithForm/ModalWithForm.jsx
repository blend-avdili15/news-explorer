import useModalClose from "../../utils/useModalClose";
import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  onSubmit,
  isOpen,
  onClose,
  hideForm,
}) {
  useModalClose(isOpen, onClose);
  {
    return (
      <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
        <div className="modal__content">
          <button className="modal__close" onClick={onClose} />
          <h2 className="modal__title">{title}</h2>
          {hideForm ? (
            <>{children}</>
          ) : (
            <form className="modal__form" onSubmit={onSubmit}>
              {children}
              <button type="submit" className="modal__submit">
                {buttonText}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default ModalWithForm;
