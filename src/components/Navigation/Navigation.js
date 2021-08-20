import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation({ place }) {
  return (
    <>
      {place === "header" && (
        <nav className="navigation">
          <ul className="navigation__links">
            <li className="navigation__list navigation__list_type_main">
              <Link
                className="navigation__link navigation__link_type_main"
                to="#"
              ></Link>
            </li>
            <li className="navigation__list">
              <Link
                className="navigation__link navigation__link_type_signup"
                to="#"
              >
                Регистрация
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_signin">
              <Link
                className="navigation__link navigation__link_type_signin"
                to="#"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {place === "menu" && (
        <nav className="navigation navigation_place_menu">
          <ul className="navigation__links">
            <li className="navigation__list navigation__list_type_menu">
              <Link
                className="navigation__link navigation__link_type_menu"
                to="#"
              >
                О проекте
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_menu">
              <Link
                className="navigation__link navigation__link_type_menu"
                to="#"
              >
                Технологии
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_menu">
              <Link
                className="navigation__link navigation__link_type_menu"
                to="#"
              >
                Студент
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {place === "about-me" && (
        <nav className="navigation">
          <ul className="navigation__links">
            <li className="navigation__list navigation__list_type_about-me">
              <Link
                className="navigation__link navigation__link_type_about-me"
                to="https://t.me/nikolaymishaev"
              >
                Telegram
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_about-me">
              <Link
                className="navigation__link navigation__link_type_about-me"
                to="https://github.com/NikolayMishaev"
              >
                Github
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_about-me">
              <Link
                className="navigation__link navigation__link_type_about-me"
                to="https://www.codewars.com/users/NikolayMishaev"
              >
                Codewars
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
