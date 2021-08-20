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
                to="#"
              >
                Telegram
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_about-me">
              <Link
                className="navigation__link navigation__link_type_about-me"
                to="#"
              >
                Github
              </Link>
            </li>
            <li className="navigation__list navigation__list_type_about-me">
              <Link
                className="navigation__link navigation__link_type_about-me"
                to="#"
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
