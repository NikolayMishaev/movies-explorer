import React from "react";
import "./Preloader.css";

export default function Preloader({ type }) {
  return (
    <section className={` preloader ${type ? `preloader_type_${type}` : ""}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </section>
  );
}
