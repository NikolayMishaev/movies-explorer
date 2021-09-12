import React from "react";
import "./SearchMessage.css";

export default function SearchMessage({ searchMessage }) {
  return (
    <section className="search-message">
      <p
        className={` search-message__message ${
          searchMessage.includes("ошибка")
            ? "search-message__message_type_error"
            : ""
        } `}
      >
        {searchMessage}
      </p>
    </section>
  );
}
