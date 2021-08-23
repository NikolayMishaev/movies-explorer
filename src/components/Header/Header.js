import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({ headerStyleMain, loggedIn }) {
  return (
    <>
      <header className={` header ${headerStyleMain ? "" : "header_style_movie"} `}>
        <Navigation loggedIn={loggedIn} place="header" />
      </header>
    </>
  );
}
