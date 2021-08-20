import React from "react";
import "./Main.css";
import Navigation from "../Navigation/Navigation";
import AboutProject from "../AboutProject/AboutProject";
import Technology from "../Technology/Technology";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

export default function Main() {
  return (
    <>
      <Navigation place="menu" />
      <AboutProject />
      <Technology/>
      <AboutMe/>
      <Portfolio/>
    </>
  );
}
