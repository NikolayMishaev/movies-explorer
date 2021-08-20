import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Promo from "../Promo/Promo";

export default function Header() {
  return (
    <>
      <header className="header">
        <Navigation place="header" />
        <Promo />
      </header>
    </>
  );
}
