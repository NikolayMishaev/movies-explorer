import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({ headerStyleMain, loggedIn, entryLocation }) {
  return (
    <>
      <header className={` ${entryLocation? "display-none" : "header" } ${headerStyleMain ? "" : "header_style_movie"} `}>
        <Navigation loggedIn={loggedIn} place="header" />
      </header>
    </>
  );
}
