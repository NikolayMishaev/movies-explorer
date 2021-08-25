import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__navigation">
        <ul className="portfolio__links">
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://nikolaymishaev.github.io/how-to-learn/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://nikolaymishaev.github.io/russian-travel/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://mestorussia.nikolaym.nomoredomains.club"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://nikolaymishaev.github.io/BBBS/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Верстка боевого проекта
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
