import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link className="header__link" to="#"></Link>
    </header>
  );
}
