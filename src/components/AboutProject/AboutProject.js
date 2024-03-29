import React from "react";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="section-title">О проекте</h2>
      <ul className="about-project__description-items">
        <li className="about-project__description-item">
          <p className="about-project__subtitle">
            Дипломный проект включал 5&nbsp;этапов
          </p>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="about-project__description-item">
          <p className="about-project__subtitle">
            На&nbsp;выполнение диплома ушло 4&nbsp;недели
          </p>
          <p className="about-project__text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__direction-items">
        <li className="about-project__direction-item">
          <p className="about-project__time">1 неделя</p>
          <p className="about-project__direction">Back-end</p>
        </li>
        <li className="about-project__direction-item about-project__direction-item_style_front-end">
          <p className="about-project__time about-project__time_style_front-end">
            3 недели
          </p>
          <p className="about-project__direction">Front-end</p>
        </li>
      </ul>
      <p className="time"></p>
    </section>
  );
}
