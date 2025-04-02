// import React from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";

// function SuccessModal({ isOpen, onClose, onSignIn }) {
//   return (
//     <ModalWithForm
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Registration successfully completed!"
//       hideForm
//     >
//       <div className="modal__button-container">
//         <button
//           type="button"
//           className="modal__success-button"
//           onClick={onSignIn}
//         >
//           Sign in
//         </button>
//       </div>
//     </ModalWithForm>
//   );
// }

// export default SuccessModal;

import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignIn }) {
  return (
    <div className="success-modal-wrapper">
      <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        title="Registration successfully completed!"
        hideForm
      >
        <div className="modal__button-container">
          <button
            type="button"
            className="modal__success-button"
            onClick={onSignIn}
          >
            Sign in
          </button>
        </div>
      </ModalWithForm>
    </div>
  );
}

export default SuccessModal;
