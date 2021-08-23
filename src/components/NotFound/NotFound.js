import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();
  return (
    <section className="not-found">
      <h2 className="not-found__error">404</h2>
      <p className="not-found__message">Страница не найдена</p>
      <button
        className="not-found__button-go-back"
        type="button"
        onClick={() => history.goBack()}
      >
        Назад
      </button>
    </section>
  );
}
