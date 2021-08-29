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
        <p className="about-me__subtitle">Фронтенд-разработчик, 35 лет</p>
        <p className="about-me__text">
          Я родился и живу в Москве, закончил агрономический факультет РГАУ-МСХА
          им К.А.Тимирязева. У меня есть жена и две дочки. Мне нравится играть
          на фортепиано. Как-то увлекся и выучил известные композиции: Ennio
          Morricone - Chi Mai, Mozart - Rondo Alla Turca, Beethoven - Fur Elise.
          С 2010 года работал в компании "Деловые Линии". Год назад меня
          заинтересовала тема программирования и теперь все свободное время я
          изучаю эту интереснейшую сферу. Помимо учебных проектов, у меня есть
          верстка боевого проекта, вошедшая в тройку лучших версий для релиза.
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
