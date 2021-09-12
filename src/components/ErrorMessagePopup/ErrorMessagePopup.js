import React from "react";
import Popup from "../Popup/Popup";

export default function ErrorMessagePopup({ errorMessage, onClose }) {
  return (
    <Popup
      name="error-message"
      isOpen={errorMessage}
      title={errorMessage}
      onClose={onClose}
    />
  );
}
