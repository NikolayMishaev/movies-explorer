import React from "react";
import "./Footer.css";
import Navigation from "../Navigation/Navigation";

export default function Footer({ entryLocation }) {
  return (
    <footer className={` ${entryLocation ? "display-none" : "footer"} `}>
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <Navigation place="footer" />
    </footer>
  );
}
