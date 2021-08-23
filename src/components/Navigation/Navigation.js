import React, { useState } from "react";
import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navigation({ place, loggedIn }) {
  const [mobileMenuOn, setMobileMenuOn] = useState(false);
  const [mobileMenuCloseOn, setMobileMenuCloseOn] = useState(false);

  function handleButtonBurgerClick(e) {
    if (mobileMenuOn) {
      setMobileMenuCloseOn(true);
      setTimeout(() => {
        setMobileMenuCloseOn(false);
        setMobileMenuOn(false);
      }, 1000);
    } else {
      loggedIn &&
        e.target.classList.contains("navigation__button-burger-menu") &&
        setMobileMenuOn(true);
    }
  }

  return (
    <>
      {place === "header" && (
        <>
          <nav
            className={` navigation ${
              mobileMenuOn ? "navigation_type_mobile-menu" : ""
            } ${mobileMenuCloseOn ? "navigation_type_mobile-menu-close" : ""} `}
            onClick={(e) =>
              e.target.classList.contains("navigation_type_mobile-menu")
                ? handleButtonBurgerClick()
                : ""
            }
          >
            <ul
              className={` navigation__links ${
                mobileMenuOn ? "navigation__links_type_mobile-menu" : ""
              } `}
            >
              <li className="navigation__list">
                <NavLink
                activeClassName={` ${mobileMenuOn? "navigation__link_active" : "" } `}
                  className={` navigation__link navigation__link_type_main ${
                    mobileMenuOn ? "navigation__link_type_mobile-menu" : ""
                  } `}
                  exact to="/"
                  onClick={handleButtonBurgerClick}
                >
                  Главная
                </NavLink>
              </li>
              <li
                className={`navigation__list navigation__list_type_signup ${
                  loggedIn ? "display-none" : ""
                }`}
              >
                <Link
                  className="navigation__link navigation__link_type_signup"
                  to="/sign-up"
                >
                  Регистрация
                </Link>
              </li>
              <li
                className={` navigation__list navigation__list_type_signin ${
                  loggedIn ? "display-none" : ""
                } `}
              >
                <Link
                  className="navigation__link navigation__link_type_signin"
                  to="/sign-in"
                >
                  Войти
                </Link>
              </li>
              <li
                className={` navigation__list navigation__list_type_movie ${
                  loggedIn ? "" : "display-none"
                } ${mobileMenuOn ? "navigation__list_type_mobile-menu" : ""}
              }`}
              >
                <NavLink
                activeClassName="navigation__link_active"
                  className={` navigation__link navigation__link_type_movie ${
                    mobileMenuOn ? "navigation__link_type_mobile-menu" : ""
                  } `}
                  to="/movies"
                  onClick={handleButtonBurgerClick}
                >
                  Фильмы
                </NavLink>
              </li>
              <li
                className={` navigation__list ${
                  loggedIn ? "" : "display-none"
                }`}
              >
                <NavLink
                activeClassName="navigation__link_active"
                  className={` navigation__link navigation__link_type_movie ${
                    mobileMenuOn ? "navigation__link_type_mobile-menu" : ""
                  } `}
                  to="/saved-movies"
                  onClick={handleButtonBurgerClick}
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li
                className={` navigation__list navigation__list_type_account ${
                  loggedIn ? "" : "display-none"
                }
                ${
                  mobileMenuOn
                    ? "navigation__list_type_mobile-menu-account"
                    : ""
                }
                `}
              >
                <NavLink
                activeClassName={` ${mobileMenuOn? "" : "navigation__link_active" } `}
                  className={` navigation__link navigation__link_type_account ${
                    mobileMenuOn
                      ? "navigation__link_type_mobile-menu-account"
                      : ""
                  }`}
                  to="/profile"
                  onClick={handleButtonBurgerClick}
                >
                  Аккаунт
                </NavLink>
              </li>
              <li
                className={` navigation__list ${
                  loggedIn ? "" : "display-none"
                } ${
                  mobileMenuOn
                    ? "navigation__list_type_button-burger-mobile-menu"
                    : ""
                }`}
              >
                <button
                  className={` navigation__button-burger-menu ${
                    mobileMenuOn
                      ? "navigation__button-burger-menu_type_mobile-menu"
                      : ""
                  }`}
                  type="button"
                  onClick={handleButtonBurgerClick}
                ></button>
              </li>
            </ul>
          </nav>
          <nav
            className={` navigation navigation_type_visible_only-mobile ${
              mobileMenuOn ? "" : "display-none"
            } `}
          >
            <ul className={` navigation__links navigation__links_type_header`}>
              <li className="navigation__list">
                <Link
                  className={` navigation__link navigation__link_type_main `}
                  to="#"
                ></Link>
              </li>
              <li className={` navigation__list `}>
                <button
                  className={` navigation__button-burger-menu `}
                  type="button"
                  onClick={handleButtonBurgerClick}
                ></button>
              </li>
            </ul>
          </nav>
        </>
      )}
      {place === "menu" && (
        <nav className="navigation navigation_place_menu">
          <ul className="navigation__links">
            <li className="navigation__list navigation__list_type_menu">
              <HashLink
                className="navigation__link navigation__link_type_menu"
                smooth
                to="#about-project"
              >
                О проекте
              </HashLink>
            </li>
            <li className="navigation__list navigation__list_type_menu">
              <HashLink
                className="navigation__link navigation__link_type_menu"
                smooth
                to="#technology"
              >
                Технологии
              </HashLink>
            </li>
            <li className="navigation__list navigation__list_type_menu">
              <HashLink
                className="navigation__link navigation__link_type_menu"
                smooth
                to="#about-me"
              >
                Студент
              </HashLink>
            </li>
          </ul>
        </nav>
      )}
      {place === "about-me" && (
        <nav className="navigation">
          <ul className="navigation__links navigation__links_type_about-me">
            <li className="navigation__list navigation__list_type_about-me">
              <a
                className="navigation__link navigation__link_type_about-me"
                href="https://t.me/nikolaymishaev"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="navigation__list navigation__list_type_about-me">
              <a
                className="navigation__link navigation__link_type_about-me"
                href="https://github.com/NikolayMishaev"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="navigation__list navigation__list_type_about-me">
              <a
                className="navigation__link navigation__link_type_about-me"
                href="https://www.codewars.com/users/NikolayMishaev"
                target="_blank"
                rel="noreferrer"
              >
                Codewars
              </a>
            </li>
          </ul>
        </nav>
      )}
      {place === "footer" && (
        <nav className="navigation">
          <ul className="navigation__links navigation__links_type_footer">
            <p className="navigation__text">&copy; 2021</p>
            <li className="navigation__list navigation__list_type_footer">
              <a
                className="navigation__link navigation__link_type_footer"
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="navigation__list navigation__list_type_footer">
              <a
                className="navigation__link navigation__link_type_footer"
                href="https://github.com/NikolayMishaev"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="navigation__list navigation__list_type_footer">
              <a
                className="navigation__link navigation__link_type_footer"
                href="https://t.me/nikolaymishaev"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
          </ul>
        </nav>
      )}
      {place === "entry" && (
        <nav className="navigation">
          <ul className="navigation__links navigation__links_type_entry">
            <li className="navigation__list">
              <Link
                className="navigation__link navigation__link_type_main"
                to="/"
              >
                Главная
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
