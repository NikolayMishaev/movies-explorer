import React from "react";
import "./Popup.css";

export default function Popup({ isOpen, onClose, name, title = "", children }) {
  function handleClickOverlay(e) {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleClickOverlay}
      className={`popup popup_type_${name} ${isOpen ? "visible-block" : ""} `}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          type="button"
          aria-label="close popup"
          className={`popup__close popup__close_type_${name}`}
          onClick={onClose}
        ></button>
        <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
        {children}
      </div>
    </div>
  );
}
