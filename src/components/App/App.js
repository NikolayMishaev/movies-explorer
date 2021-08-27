import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
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
import { register, login, getContent, editProfile } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { api } from "../../utils/MoviesApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // стейт для авторизации пользователя.
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false); // стейт состояния чекбокса короткомертажных фильмов.
  const [headerStyleMain, setHeaderStyleMain] = useState(true); // стейт для изменения фона компонента Header.
  const [cardMovieDelete, setCardMovieDelete] = useState(false); // стейт кнопки лайка карточки фильма.
  const [entryLocation, setEntryLocation] = useState(false); // стейт отображения компонентов Header и Footer.
  const [errorMessagePopupVisible, setErrorMessagePopupVisible] =
    useState(false); // стейт видимости модального окна с ошибкой.
  const [errorMessagePopupText, setErrorMessagePopupText] = useState(""); // стейт сообщения ошибки модального окна.
  const [currentUser, setCurrentUser] = useState({}); // стейт с данными текущего авторизованного пользователя.
  const [formSubmitSendingStatus, setFormSubmitSendingStatus] = useState(""); // стейт состояние обработки сабмита формы.
  const [formSubmitStatus, setFormSubmitStatus] = useState(""); // стейт с результатом сабмита формы.

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname !== "/") {
      // на всех маршрутах, кроме этого, установить белый фон для компонента Header.
      setHeaderStyleMain(false);
    } else {
      setHeaderStyleMain(true);
    }
    if (location.pathname === "/saved-movies") {
      // при переходе на роут, изменить икнони лайка с сердца на крестик при наведении.
      setCardMovieDelete(true);
    } else {
      setCardMovieDelete(false);
    }
    if (
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies" ||
      location.pathname === "/"
      //  при переходе на все роуты, кроме данных, скрыть компоненты Header и Footer.
    ) {
      setEntryLocation(false);
    } else {
      setEntryLocation(true);
    }
    setFormSubmitStatus("");
    // сбросить стейт с результатом сабмита формы.
  }, [location]);

  useEffect(() => {
    checkValidityToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getMoviesCards() {
    api
      .getMovieCards()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
      });
  }

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

  function checkValidityToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          } else {
          }
        })
        .catch((err) => {
          history.push("/");
          // При завершении проверки валидности jwt ошибкой, вернуть пользователя на главную страницу.
          // т.к. компонент ProtectedRoute разрешает роут при наличии jwt в localStorage.
          setErrorMessagePopupText(err);
          setErrorMessagePopupVisible(true);
        });
    }
  }

  function onRegister(name, email, password) {
    setFormSubmitSendingStatus("Регистрация нового пользователя...");
    setFormSubmitStatus("");
    register(name, email, password)
      .then(() => {
        setFormSubmitStatus("Пользователь успешно зарегистрирован!");
        onLogin(email, password);
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
        setFormSubmitStatus("Произошла ошибка при регистрации пользователя");
      })
      .finally(() => setFormSubmitSendingStatus(""));
  }

  function onLogin(email, password) {
    setFormSubmitSendingStatus("Авторизация пользователя...");
    setFormSubmitStatus("");
    login(email, password)
      .then((data) => {
        if (!data) {
          setFormSubmitStatus("Произошла ошибка при авторизации пользователя");
          return;
        }
        if (data.token) {
          setFormSubmitStatus("Пользователь успешно авторизован!");
          localStorage.setItem("jwt", data.token);
          checkValidityToken();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
        setFormSubmitStatus("Произошла ошибка при авторизации пользователя");
      })
      .finally(() => setFormSubmitSendingStatus(""));
  }

  function onEditProfile(name, email) {
    setFormSubmitSendingStatus("Обновление данных профиля...");
    setFormSubmitStatus("");
    const jwt = localStorage.getItem("jwt");
    editProfile(name, email, jwt)
      .then((data) => {
        setCurrentUser(data);
        setFormSubmitStatus("Данные профиля успешно обновлены!");
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
        setFormSubmitStatus("Не удалось обновить данные профиля");
      })
      .finally(() => setFormSubmitSendingStatus(""));
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            <ProtectedRoute
              path="/profile"
              component={Profile}
              signOut={onSignOut}
              onEditProfile={onEditProfile}
              loggedIn={loggedIn}
              formSubmitSendingStatus={formSubmitSendingStatus}
              formSubmitStatus={formSubmitStatus}
            />
            <Route path="/sign-in">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  onLogin={onLogin}
                  formSubmitSendingStatus={formSubmitSendingStatus}
                  formSubmitStatus={formSubmitStatus}
                />
              )}
              {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.
              Получается, что данный роут тоже защищен для авторизованного пользователя. Но в ТЗ есть такой пункт: 
              "Если пользователь закрыл вкладку и был авторизован, он может вернуться сразу на любую страницу приложения по URL-адресу, 
              кроме страниц авторизации и регистрации. " */}
            </Route>
            <Route path="/sign-up">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onRegister={onRegister}
                  formSubmitSendingStatus={formSubmitSendingStatus}
                  formSubmitStatus={formSubmitStatus}
                />
              )}
              {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.
              Получается, что данный роут тоже защищен для авторизованного пользователя. Но в ТЗ есть такой пункт: 
              "Если пользователь закрыл вкладку и был авторизован, он может вернуться сразу на любую страницу приложения по URL-адресу, 
              кроме страниц авторизации и регистрации. " */}
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              openPopupError={handleOpenErrorMessagePopup}
              loggedIn={loggedIn}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              cardMovieDelete={cardMovieDelete}
              openPopupError={handleOpenErrorMessagePopup}
              loggedIn={loggedIn}
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
