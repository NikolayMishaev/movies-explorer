import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ErrorMessagePopup from "../ErrorMessagePopup/ErrorMessagePopup";
import { register, login, getContent } from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // стейт для авторизации пользователя
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false); // стейт состояния чекбокса короткомертажных фильмов
  const [headerStyleMain, setHeaderStyleMain] = useState(true); // стейт для изменения фона компонента Header
  const [cardMovieDelete, setCardMovieDelete] = useState(false); // стейт кнопки лайка карточки фильма
  const [entryLocation, setEntryLocation] = useState(false); // стейт отображения компонентов Header и Footer
  const [errorMessagePopupVisible, setErrorMessagePopupVisible] =
    useState(false); // стейт отображения модального окна с ошибкой
  const [errorMessagePopupText, setErrorMessagePopupText] = useState(""); // стейт отображения сообщения ошибки модального окна

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname !== "/") {
      // на всех маршрутах кроме этого установить белый фон для компонента Header
      setHeaderStyleMain(false);
    } else {
      setHeaderStyleMain(true);
    }
    if (location.pathname === "/saved-movies") {
      // при переходе на роут изменить икнони лайка с сердца на крестик при наведении
      setCardMovieDelete(true);
    } else {
      setCardMovieDelete(false);
    }
    if (
      location.pathname === "/movies" || //  при переходе на все роуты, кроме данных, скрыть компоненты Header и Footer
      location.pathname === "/saved-movies" ||
      location.pathname === "/"
    ) {
      setEntryLocation(false);
    } else {
      setEntryLocation(true);
    }
  }, [location]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => {
          setErrorMessagePopupText(err);
          setErrorMessagePopupVisible(true);
        });
    }
  }, [loggedIn, history]);

  function handleMovieCheckbox() {
    // смена состояния чекбокса короткометражными фильмами
    setShortMovieCheckbox(!shortMovieCheckbox);
  }

  function handleOpenErrorMessagePopup(text) {
    // обработчик открытия модального окна с ошибкой
    setErrorMessagePopupVisible(true);
    setErrorMessagePopupText(text);
  }

  function handleCloseErrorMessagePopup() {
    // обработчик закрытия модального окна с ошибкой
    setErrorMessagePopupVisible(false);
    setErrorMessagePopupText("");
  }

  function onRegister(name, email, password) {
    register(name, email, password)
      .then(() => {
        onLogin(email, password);
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
      });
  }

  function onLogin(email, password) {
    login(email, password)
      .then((data) => {
        if (!data) {
          setErrorMessagePopupText("Что-то пошло не так...");
          setErrorMessagePopupVisible(true);
          return;
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
      });
  }

function editProfile() {

}

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  }

  return (
    <div className="page page_align_center">
      <Header
        headerStyleMain={headerStyleMain}
        loggedIn={loggedIn}
        entryLocation={entryLocation}
      />
      <main className="content">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/profile">
            <Profile
              signOut={onSignOut}
              editProfile={editProfile}
            />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/movies">
            <Movies
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              openPopupError={handleOpenErrorMessagePopup}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              cardMovieDelete={cardMovieDelete}
              openPopupError={handleOpenErrorMessagePopup}
            />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer entryLocation={entryLocation} />
      <ErrorMessagePopup
        errorMessage={errorMessagePopupText}
        isOpen={errorMessagePopupVisible}
        onClose={handleCloseErrorMessagePopup}
      />
    </div>
  );
}

export default App;
