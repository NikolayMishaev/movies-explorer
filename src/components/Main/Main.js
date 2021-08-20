import React from "react";
import "./Main.css";
import Navigation from "../Navigation/Navigation";
import AboutProject from "../AboutProject/AboutProject";
import Technology from "../Technology/Technology";

export default function Main() {
  return (
    <>
      <Navigation place="menu" />
      <AboutProject />
      <Technology/>
    </>
  );
}
