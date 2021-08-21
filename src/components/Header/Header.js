import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn }) {
  return (
    <>
      <header className={` header ${loggedIn ? "header_style_log-in" : ""} `}>
        <Navigation loggedIn={loggedIn} place="header" />
      </header>
    </>
  );
}
