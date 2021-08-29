import React from "react";
import "./Preloader.css";

export default function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </section>
  );
}
