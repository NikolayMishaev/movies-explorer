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
              href="https://nikolaymishaev.github.io/bbbs/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Верстка боевого проекта «BBBS»
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://dashboard-kit-2022.herokuapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              Приложение «Dashboard Kit»
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://mestorussia.nikolaym.nomoredomains.club/"
              target="_blank"
              rel="noreferrer"
            >
              Приложение «Mesto»
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://nikolaymishaev.github.io/russian-travel-add/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивная верстка «Путешествия по России»
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://nikolaymishaev.github.io/stacking-game/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Игра «Stacking»
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://nikolaymishaev.github.io/solve-an-example-game/solve-an-example-game.html"
              target="_blank"
              rel="noreferrer"
            >
              Игра «Solve an example»
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
