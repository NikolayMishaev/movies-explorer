import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { api } from "../../utils/MoviesApi";
import { register, login, getContent, editProfile } from "../../utils/MainApi";
// импорт компонентов
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

export default function App() {
  const location = useLocation();
  const history = useHistory();

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
  // стейт сообщения с результатами поиска в форме поиска фильмов.
  const [searchMessage, setSearchMessage] = useState("");
  // стейт с данными карточек фильмов полученных из API.
  const [moviesCards, setMoviesCards] = useState([]);
  // стейт с отфильтрованными карточками.
  const [filteredMoviesCards, setFilteredMoviesCards] = useState([]);
  // стейт с ключевым словом поиска в фоме поиска фильмов
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    checkValidityToken();
    getMoviesCardsFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // обработчик фильтрации карточек по введенному ключевому слову в форму поиска и отмеченым флажкам.
  // заложена масштабируемость, для возможности фильтрации по нескольким чекбоксам.
  function handleFilteredMoviesCards() {
    setPreloaderVisible(true);
    const filteredMoviesCards = moviesCards.filter(
      (card) =>
        // передать массив с именами фильмов в функцию для поиска совпадения по имени.
        findMatchMovieName([card.nameRU, card.nameEN]) &&
        // если совпадение есть, передать картчоку в функцию проверки совпадений согласно установленным флажкам
        findMatchCheckboxes(card)
    );

    // функция проверки совпадения по имени
    function findMatchMovieName(arrayWithCardNameS) {
      return arrayWithCardNameS.some(
        (name) => name && name.toLowerCase().includes(searchValue)
      );
    }

    function findMatchCheckboxes(card) {
      // если флажок "короткометражки" отмечен, передать продолжительность фильма в функцию проверки совпадения по длительности.
      // если совпадение есть, инвертировать результат, чтобы условие не выполнилось, перейти к проверке следующего чекбокса
      if (shortMovieCheckbox && !findMatchMovieShort(card.duration)) {
        // если хотя бы один из чекбоксов не прошел проверку вернуть false
        return false;
      }
      // если все проверки (для каждого чекбокса) прошли успешно, вернуть true
      return true;
    }

    // функция проверки совпадения по длительности
    function findMatchMovieShort(duration) {
      // если продолжительности есть и она меньше или равна 40 минутам, вернуть true, иначе false.
      return duration && duration <= 40;
    }

    setFilteredMoviesCards(filteredMoviesCards);
    setPreloaderVisible(false);
  }

  // получить карточки фильмов из localStorage и записать в стейт
  function getMoviesCardsFromLocalStorage() {
    const movies = localStorage.getItem("movies");
    if (movies) {
      setMoviesCards(JSON.parse(movies));
    }
  }

  // получить карточки фильмов через запрос к API
  function getMoviesCardsFromAPI() {
    api
      .getMovieCards()
      .then((data) => {
        // записать карточки в localStorage и стейт
        localStorage.setItem("movies", JSON.stringify(data));
        setMoviesCards(data);
      })
      .catch((err) => {
        setErrorMessagePopupText(err);
        setErrorMessagePopupVisible(true);
        setPreloaderVisible(false);
        setSearchMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }

  useEffect(() => {
    // если в стейт-переменной нет карточек, и отправлен запрос в форме поиска, то получить карточки через API
    if (!moviesCards.length && searchValue) {
      setPreloaderVisible(true);
      getMoviesCardsFromAPI();
    }
    moviesCards.length && searchValue && handleFilteredMoviesCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCards, searchValue, shortMovieCheckbox]);

  useEffect(() => {
    setSearchMessage("");
    // если в стейт-переменной с отфильтрованными карточками нет данных и произошел сабмит формы поиска,
    // изменить сообщение в стейт-переменной с сообщением о результате поиска.
    !filteredMoviesCards.length &&
      searchValue &&
      setSearchMessage("Ничего не найдено");
  }, [filteredMoviesCards, searchValue]);

  function handleMovieCheckbox() {
    setShortMovieCheckbox(!shortMovieCheckbox);
  }

  function handleSearchValue(searchValue) {
    setSearchValue(searchValue);
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

  function handleCardLike() {}

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
              moviesCards={filteredMoviesCards}
              handleSearchValue={handleSearchValue}
              searchMessage={searchMessage}
              onCardLike={handleCardLike}
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
