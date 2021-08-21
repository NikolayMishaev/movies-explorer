import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <>
      <header className="header">
        <Navigation place="header" />
      </header>
    </>
  );
}
