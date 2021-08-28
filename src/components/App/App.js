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
  // стейт для авторизации пользователя.
  const [loggedIn, setLoggedIn] = useState(false);
  // стейт чекбокса короткомертажных фильмов.
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false);
  // стейт для изменения фона компонента Header.
  const [headerStyleMain, setHeaderStyleMain] = useState(true);
  // стейт кнопки лайка карточки фильма.
  const [cardMovieDelete, setCardMovieDelete] = useState(false);
  // стейт отображения компонентов Header и Footer.
  const [entryLocation, setEntryLocation] = useState(false);
  // стейт видимости модального окна с ошибкой.
  const [errorMessagePopupVisible, setErrorMessagePopupVisible] =
    useState(false);
  // стейт сообщения ошибки модального окна.
  const [errorMessagePopupText, setErrorMessagePopupText] = useState("");
  // стейт с данными текущего авторизованного пользователя.
  const [currentUser, setCurrentUser] = useState({});
  // стейт состояние обработки сабмита формы.
  const [formSubmitSendingStatus, setFormSubmitSendingStatus] = useState("");
  // стейт с результатом сабмита формы.
  const [formSubmitStatus, setFormSubmitStatus] = useState("");
  // стейт состояния отображения прелоадера в форме поиска фильмов.
  const [preloaderVisible, setPreloaderVisible] = useState(false);
  // стейт с данными карточек фильмов полученных из API.
  const [moviesCards, setMoviesCards] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // на всех маршрутах, кроме этого, установить белый фон для компонента Header.
    if (location.pathname !== "/") {
      setHeaderStyleMain(false);
    } else {
      setHeaderStyleMain(true);
    }
    // при переходе на роут, изменить икнони лайка с сердца на крестик при наведении.
    if (location.pathname === "/saved-movies") {
      setCardMovieDelete(true);
    } else {
      setCardMovieDelete(false);
    }
    if (
      //  при переходе на все роуты, кроме данных, скрыть компоненты Header и Footer.
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies" ||
      location.pathname === "/"
    ) {
      setEntryLocation(false);
    } else {
      setEntryLocation(true);
    }
    // сбросить стейт с результатом сабмита формы.
    setFormSubmitStatus("");
  }, [location]);

  useEffect(() => {
    checkValidityToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showMoviesCards() {
    setPreloaderVisible(true);
    const movies = localStorage.getItem("movies");
    if (movies) {
      setMoviesCards(JSON.parse(movies));
    } else {
      api
        .getMovieCards()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
          setMoviesCards(data);
        })
        .catch((err) => {
          setErrorMessagePopupText(err);
          setErrorMessagePopupVisible(true);
        });
    }
    setPreloaderVisible(false);
  }

  function handleMovieCheckbox() {
    setShortMovieCheckbox(!shortMovieCheckbox);
  }

  // обработчик открытия модального окна с ошибкой
  function handleOpenErrorMessagePopup(text) {
    setErrorMessagePopupVisible(true);
    setErrorMessagePopupText(text);
  }

  // обработчик закрытия модального окна с ошибкой
  function handleCloseErrorMessagePopup() {
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
          // при завершении проверки валидности jwt ошибкой, вернуть пользователя на главную страницу.
          // т.к. компонент ProtectedRoute разрешает роут при наличии jwt в localStorage не проверяя его.
          history.push("/");
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
              {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.
              получается, что данный роут тоже защищен для авторизованного пользователя. Но в ТЗ есть такой пункт: 
              "если пользователь закрыл вкладку и был авторизован, он может вернуться сразу на любую страницу приложения по URL-адресу, 
              кроме страниц авторизации и регистрации. " */}
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  onLogin={onLogin}
                  formSubmitSendingStatus={formSubmitSendingStatus}
                  formSubmitStatus={formSubmitStatus}
                />
              )}
            </Route>
            <Route path="/sign-up">
              {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.
              получается, что данный роут тоже защищен для авторизованного пользователя. Но в ТЗ есть такой пункт: 
              "если пользователь закрыл вкладку и был авторизован, он может вернуться сразу на любую страницу приложения по URL-адресу, 
              кроме страниц авторизации и регистрации. " */}
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onRegister={onRegister}
                  formSubmitSendingStatus={formSubmitSendingStatus}
                  formSubmitStatus={formSubmitStatus}
                />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              openPopupError={handleOpenErrorMessagePopup}
              loggedIn={loggedIn}
              preloaderVisible={preloaderVisible}
              showMoviesCards={showMoviesCards}
              moviesCards={moviesCards}
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
