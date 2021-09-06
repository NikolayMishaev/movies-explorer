import React from "react";
import "./Footer.css";
// импорт компонентов
import Navigation from "../Navigation/Navigation";

export default function Footer({ visibleHeaderFooter }) {
  return (
    <footer className={` ${visibleHeaderFooter ? "footer" : "display-none"} `}>
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <Navigation place="footer" />
    </footer>
  );
}
