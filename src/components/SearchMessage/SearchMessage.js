import React from "react";
import "./SearchMessage.css";

export default function SearchMessage({ searchMessage }) {
  return (
    <section className="search-message">
      <p className="search-message__message">{searchMessage}</p>
    </section>
  );
}
