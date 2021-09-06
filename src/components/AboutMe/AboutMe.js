import React from "react";
import "./AboutMe.css";
import photo from "../../images/about-me-photo.jpg";
// импорт компонентов
import Navigation from "../Navigation/Navigation";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="section-title section-title_type_about-me">Студент</h2>
      <article className="about-me__wrapper">
        <h3 className="about-me__title">Николай</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 35&nbsp;лет</p>
        <p className="about-me__text">
        Я&nbsp;родился и&nbsp;живу в&nbsp;Москве, закончил агрономический факультет РГАУ-МСХА
им&nbsp;К.А.Тимирязева. У&nbsp;меня есть жена и&nbsp;две дочки. Мне нравится играть
на&nbsp;фортепиано. Как-то увлекся и&nbsp;выучил известные композиции: Ennio
Morricone&nbsp;&mdash; Chi Mai, Mozart&nbsp;&mdash; Rondo Alla Turca, Beethoven&nbsp;&mdash; Fur Elise.
С&nbsp;2010 года работал в&nbsp;компании &laquo;Деловые Линии&raquo;. Год назад меня
заинтересовала тема программирования и&nbsp;теперь все свободное время я
изучаю эту интереснейшую сферу. Помимо учебных проектов, у&nbsp;меня есть
верстка боевого проекта, вошедшая в&nbsp;тройку лучших версий для релиза.
        </p>
        <Navigation place="about-me" />
      </article>
      <img
        className="about-me__photo"
        src={photo}
        alt="фотография студента"
      ></img>
    </section>
  );
}
