import React from "react";
import "./Portfolio.css";
import { Link } from "react-router-dom";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__navigation">
        <ul className="portfolio__links">
          <li className="portfolio__list">
            <Link className="portfolio__link" to="https://nikolaymishaev.github.io/how-to-learn/index.html">
              Статичный сайт
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link" to="https://nikolaymishaev.github.io/russian-travel/index.html">
              Адаптивный сайт
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link" to="https://mestorussia.nikolaym.nomoredomains.club">
              Одностраничное приложение
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link" to="https://nikolaymishaev.github.io/BBBS/index.html">
              Верстка боевого проекта
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
