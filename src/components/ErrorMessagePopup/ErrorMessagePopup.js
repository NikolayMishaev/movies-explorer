import React from "react";
import Popup from "../Popup/Popup";

export default function ErrorMessagePopup({ errorMessage, isOpen, onClose }) {
  return (
    <Popup
      name="error-message"
      isOpen={isOpen}
      title={errorMessage}
      onClose={onClose}
    />
  );
}
