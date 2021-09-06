/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  register,
  login,
  getCurrentUser,
  editProfile,
  getSavedMoviesCards,
  saveMovieCard,
  deleteMovieCard,
} from "../../utils/MainApi";
import {
  calculateNumberMoviesCards,
  getNumberCardsForAlignLastRow,
} from "../../utils/utils";
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
  // стейт с данными текущего авторизованного пользователя.
  const [currentUser, setCurrentUser] = useState({});
  // стейт использования основного стиля (цвета фона) компонента Header.
  const [mainStyleHeader, setMainStyleHeader] = useState(true);
  // стейт нахождения на странице /saved-movies.
  const [locationSavedMovies, setLocationSavedMovies] = useState(false);
  // стейт отображения компонентов Header и Footer.
  const [visibleHeaderFooter, setVisibleHeaderFooter] = useState(true);
  // стейт отображения прелоадера в процессе загрузки фильмов.
  const [visiblePreloader, setVisiblePreloader] = useState(false);
  // стейт сообщения ошибки попапа для ошибок.
  const [errorMessagePopupForError, setErrorMessagePopupForError] =
    useState("");
  // стейт статуса отправки форм авторизации.
  const [statusSubmitAuthorizationForms, setStatusSubmitAuthorizationForms] =
    useState("");
  // стейт с сообщением результата отправки форм авторизации.
  const [
    messageWithResultSubmitAuthorizationForms,
    setMessageWithResultSubmitAuthorizationForms,
  ] = useState("");

  // стейт с ключевым словом поиска в форме фильмов
  const [searchValueMovies, setSearchValueMovies] = useState("");
  // стейт чекбокса короткомертажных фильмов.
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false);
  // стейт сообщения с результатами поиска в форме поиска фильмов.
  const [messageWithResultSearchMovies, setMessageWithResultSearchMovies] =
    useState("");
  // стейт всех карточек фильмов.
  const [moviesCards, setMoviesCards] = useState([]);
  // стейт отфильтрованных карточек фильмов.
  const [filteredMoviesCards, setFilteredMoviesCards] = useState([]);
  // стейт отфильтрованных карточек фильмов только по ключевому слову.
  const [
    filteredMoviesCardsOnlyBySearcyValue,
    setFilteredMoviesCardsOnlyBySearcyValue,
  ] = useState([]);
  // стейт отображаемых карточек фильмов.
  const [displayedMoviesCards, setDisplayedMoviesCards] = useState([]);

  // стейт с ключевым словом поиска в форме сохраненных фильмов
  const [searchValueSavedMovies, setSearchValueSavedMovies] = useState("");
  // стейт чекбокса короткомертажных сохнаненных фильмов.
  const [shortSavedMoviesCheckbox, setShortSavedMoviesCheckbox] =
    useState(false);
  // стейт сообщения с результатами поиска в форме поиска сохраненных фильмов.
  const [
    messageWithResultSearchSavedMovies,
    setMessageWithResultSearchSavedMovies,
  ] = useState("");
  // стейт всех карточек сохраненных фильмов.
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  // стейт отфильтрованных карточек сохраненных фильмов.
  const [filteredSavedMoviesCards, setFilteredSavedMoviesCards] = useState([]);
  // стейт отфильтрованных карточек сохраненных фильмов только по ключевому слову.
  const [
    filteredSavedMoviesCardsOnlyBySearcyValue,
    setFilteredSavedMoviesCardsOnlyBySearcyValue,
  ] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      searchValueMovies && onSearchMovies(searchValueMovies);
      (searchValueSavedMovies || savedMoviesCards.length) &&
        onSearchSavedMovies(searchValueSavedMovies);
    } else {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        handleDataLogin(jwt);
      } else {
        removeItemsFromLocalStorage();
        resetStatesForRegisteredUser();
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    // на всех роутах, кроме этого, установить главный стиль(белый фон) для компонента Header.
    if (location.pathname === "/") {
      setMainStyleHeader(true);
    } else {
      setMainStyleHeader(false);
    }
    // при переходе на роут, установить соответствующий стейт локации.
    if (location.pathname === "/saved-movies") {
      setLocationSavedMovies(true);
      // обновить результаты стейта фильтра с сохраненными карточками.
      loggedIn && onSearchSavedMovies(searchValueSavedMovies);
    } else {
      setLocationSavedMovies(false);
    }
    if (
      //  при переходе на данные роуты, скрыть компоненты Header и Footer.
      location.pathname === "/sign-in" ||
      location.pathname === "/sign-up"
    ) {
      setVisibleHeaderFooter(false);
    } else {
      setVisibleHeaderFooter(true);
    }
    // сбросить стейт с сообщением результата отправки форм авторизации.
    messageWithResultSubmitAuthorizationForms &&
      setMessageWithResultSubmitAuthorizationForms("");
  }, [location]);

  useEffect(() => {
    loggedIn &&
      localStorage.setItem("shortMoviesCheckbox", shortMoviesCheckbox);
    if (shortMoviesCheckbox && filteredMoviesCards.length) {
      const { resultFiltered } = filterMoviesCards({
        cards: filteredMoviesCards,
        checkbox: shortMoviesCheckbox,
      });
      setFilteredMoviesCards(resultFiltered);
      !resultFiltered.length &&
        setMessageWithResultSearchMovies("Ничего не найдено");
    } else {
      setMessageWithResultSearchMovies("");
      // если в отфильтрованных только по слову ничего нет, тогда не обновляем стейт отфильтрованных карточек
      filteredMoviesCardsOnlyBySearcyValue.length &&
        setFilteredMoviesCards(filteredMoviesCardsOnlyBySearcyValue);
    }
  }, [shortMoviesCheckbox]);

  useEffect(() => {
    loggedIn &&
      localStorage.setItem(
        "shortSavedMoviesCheckbox",
        shortSavedMoviesCheckbox
      );
    if (shortSavedMoviesCheckbox && filteredSavedMoviesCards.length) {
      const { resultFiltered } = filterMoviesCards({
        cards: filteredSavedMoviesCards,
        checkbox: shortSavedMoviesCheckbox,
      });
      setFilteredSavedMoviesCards(resultFiltered);
    } else {
      setFilteredSavedMoviesCards(filteredSavedMoviesCardsOnlyBySearcyValue);
    }
    if (
      shortSavedMoviesCheckbox &&
      savedMoviesCards.length &&
      !searchValueSavedMovies &&
      !filteredSavedMoviesCards.length
    ) {
      const { resultFiltered } = filterMoviesCards({
        cards: savedMoviesCards,
        checkbox: shortSavedMoviesCheckbox,
      });
      setFilteredSavedMoviesCards(resultFiltered);
      setFilteredSavedMoviesCardsOnlyBySearcyValue(savedMoviesCards);
    }
  }, [shortSavedMoviesCheckbox]);

  useEffect(() => {
    // если отфильтрованных сохраненных карточек нет и есть слово в фомре поиска
    if (!filteredSavedMoviesCards.length && searchValueSavedMovies) {
      setMessageWithResultSearchSavedMovies("Ничего не найдено");
      // иначе, если отфильтрованные сохраненные карточки есть
    } else if (filteredSavedMoviesCards.length) {
      setMessageWithResultSearchSavedMovies("");
      // иначе, если нет отфильтрованных сохраненных карточек и отмечен чекбокс сохраненных фильмов и есть сохраненные карточки
    } else if (
      !filteredSavedMoviesCards.length &&
      shortSavedMoviesCheckbox &&
      savedMoviesCards.length
    ) {
      setMessageWithResultSearchSavedMovies(
        "Из всех ваших сохраненных фильмов не нашлось короткометражных"
      );
      // сделано, чтобы была возможность фильтровать карточки нажатием на чекбокс.
      // т.к. при первом переходе на страницу, сразу отображаются все сохраненные карточк, а слово поиска не введено, и первое условие не сработает.
    } else {
      setMessageWithResultSearchSavedMovies(
        "Вы еще не сохранили ни один фильм"
      );
    }
  }, [filteredSavedMoviesCards]);

  useEffect(() => {
    setDisplayedMoviesCards(
      filteredMoviesCards.slice(0, calculateNumberMoviesCards())
    );
  }, [filteredMoviesCards]);

  // обработчик открытия модального окна с ошибкой
  function handleOpenErrorMessagePopup(errorMessage) {
    setErrorMessagePopupForError(errorMessage);
  }

  // обработчик закрытия модального окна с ошибкой
  function handleCloseErrorMessagePopup() {
    setErrorMessagePopupForError("");
  }

  function onRegister(name, email, password) {
    setStatusSubmitAuthorizationForms("Регистрация нового пользователя...");
    setMessageWithResultSubmitAuthorizationForms("");
    register(name, email, password)
      .then(() => {
        setMessageWithResultSubmitAuthorizationForms(
          "Пользователь успешно зарегистрирован!"
        );
        onLogin(email, password);
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setMessageWithResultSubmitAuthorizationForms(
          "Произошла ошибка при регистрации пользователя"
        );
      })
      .finally(() => setStatusSubmitAuthorizationForms(""));
  }

  function onLogin(email, password) {
    setStatusSubmitAuthorizationForms("Авторизация пользователя...");
    setMessageWithResultSubmitAuthorizationForms("");
    login(email, password)
      .then((data) => {
        if (data.token) {
          setMessageWithResultSubmitAuthorizationForms(
            "Пользователь успешно авторизован!"
          );
          localStorage.setItem("jwt", data.token);
          handleDataLogin(data.token);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setMessageWithResultSubmitAuthorizationForms(
          "Произошла ошибка при авторизации пользователя"
        );
      })
      .finally(() => setStatusSubmitAuthorizationForms(""));
  }

  function onEditProfile(name, email) {
    setStatusSubmitAuthorizationForms("Обновление данных профиля...");
    setMessageWithResultSubmitAuthorizationForms("");
    const jwt = localStorage.getItem("jwt");
    editProfile(name, email, jwt)
      .then((data) => {
        setCurrentUser(data);
        setMessageWithResultSubmitAuthorizationForms(
          "Данные профиля успешно обновлены!"
        );
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setMessageWithResultSubmitAuthorizationForms(
          "Произошла ошибка. Обновить данные профиля не удалось."
        );
      })
      .finally(() => setStatusSubmitAuthorizationForms(""));
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  async function handleDataLogin(jwt) {
    const currentUser = await checkValidityToken(jwt);
    if (currentUser) {
      setCurrentUser(currentUser);
      const savedMoviesCards = await getSavedMoviesCardsFromAPI(jwt);
      if (savedMoviesCards) {
        setSavedMoviesCards(savedMoviesCards);
        const {
          moviesCards,
          searchValueMovies,
          searchValueSavedMovies,
          shortMoviesCheckbox,
          shortSavedMoviesCheckbox,
        } = getAllSavedValuesFromLocalStorage();
        moviesCards && setMoviesCards(moviesCards);
        searchValueMovies && setSearchValueMovies(searchValueMovies);
        searchValueSavedMovies &&
          setSearchValueSavedMovies(searchValueSavedMovies);
        shortMoviesCheckbox && setShortMoviesCheckbox(shortMoviesCheckbox);
        shortSavedMoviesCheckbox &&
          setShortSavedMoviesCheckbox(shortSavedMoviesCheckbox);
        setLoggedIn(true);
      }
    }
  }

  function checkValidityToken(jwt) {
    return getCurrentUser(jwt)
      .then((res) => {
        if (res) {
          return res;
        }
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
      });
  }

  function getSavedMoviesCardsFromAPI(jwt) {
    return getSavedMoviesCards(jwt)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        setErrorMessagePopupForError(
          `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и обновите страницу. ${err}`
        );
      });
  }

  function getAllSavedValuesFromLocalStorage() {
    const searchValueMovies = getSearchValueMoviesFromLocalStorage();
    const searchValueSavedMovies = getSearchValueSavedMoviesFromLocalStorage();
    const shortMoviesCheckbox = getshortMovieCheckboxFromLocalStorage();
    const shortSavedMoviesCheckbox =
      getshortSavedMoviesCheckboxFromLocalStorage();
    const moviesCards = getMoviesCardsFromLocalStorage();
    return {
      searchValueMovies,
      searchValueSavedMovies,
      shortMoviesCheckbox,
      shortSavedMoviesCheckbox,
      moviesCards,
    };
  }

  function getSearchValueMoviesFromLocalStorage() {
    return localStorage.getItem("searchValueMovies");
  }

  function getSearchValueSavedMoviesFromLocalStorage() {
    return localStorage.getItem("searchValueSavedMovies");
  }

  function getshortMovieCheckboxFromLocalStorage() {
    return localStorage.getItem("shortMoviesCheckbox") === "true";
  }

  function getshortSavedMoviesCheckboxFromLocalStorage() {
    return localStorage.getItem("shortSavedMoviesCheckbox") === "true";
  }

  function getMoviesCardsFromLocalStorage() {
    const moviesCards = localStorage.getItem("moviesCards");
    if (moviesCards) {
      return JSON.parse(moviesCards);
    }
  }

  function removeItemsFromLocalStorage() {
    localStorage.removeItem("moviesCards");
    localStorage.removeItem("searchValueMovies");
    localStorage.removeItem("searchValueSavedMovies");
    localStorage.removeItem("shortMoviesCheckbox");
    localStorage.removeItem("shortSavedMoviesCheckbox");
  }

  function resetStatesForRegisteredUser() {
    setCurrentUser({});
    setMessageWithResultSearchMovies("");
    setMessageWithResultSearchSavedMovies("");
    setMoviesCards([]);
    setSavedMoviesCards([]);
    setFilteredMoviesCards([]);
    setFilteredSavedMoviesCards([]);
    setFilteredMoviesCardsOnlyBySearcyValue([]);
    setFilteredSavedMoviesCardsOnlyBySearcyValue([]);
    setSearchValueMovies("");
    setSearchValueSavedMovies("");
    setShortMoviesCheckbox(false);
    setShortSavedMoviesCheckbox(false);
  }

  function handleMovieCheckbox() {
    locationSavedMovies
      ? setShortSavedMoviesCheckbox(!shortSavedMoviesCheckbox)
      : setShortMoviesCheckbox(!shortMoviesCheckbox);
  }

  async function onSearchMovies(searchValue) {
    setVisiblePreloader(true);
    setSearchValueMovies(searchValue);
    localStorage.setItem("searchValueMovies", searchValue);
    setMessageWithResultSearchMovies("");
    if (!moviesCards.length) {
      const moviesCards = await getMoviesCardsFromAPI();
      if (moviesCards) {
        localStorage.setItem("moviesCards", JSON.stringify(moviesCards));
        setMoviesCards(moviesCards);
        handleFilterMoviesCards({
          cards: moviesCards,
          search: searchValue,
          checkbox: shortMoviesCheckbox,
        });
      }
    } else {
      handleFilterMoviesCards({
        cards: moviesCards,
        search: searchValue,
        checkbox: shortMoviesCheckbox,
      });
    }
  }

  function onSearchSavedMovies(searchValue) {
    setVisiblePreloader(true);
    setSearchValueSavedMovies(searchValue);
    localStorage.setItem("searchValueSavedMovies", searchValue);
    setMessageWithResultSearchSavedMovies("");
    const { resultFiltered, resultFilteredOnlyBySearcyValue } =
      filterMoviesCards({
        cards: savedMoviesCards,
        search: searchValue,
        checkbox: shortSavedMoviesCheckbox,
      });
    setFilteredSavedMoviesCards(resultFiltered);
    setFilteredSavedMoviesCardsOnlyBySearcyValue(
      searchValue ? resultFilteredOnlyBySearcyValue : savedMoviesCards
    );
    setVisiblePreloader(false);
  }

  function getMoviesCardsFromAPI() {
    return api
      .getMovieCards()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setVisiblePreloader(false);
        setMessageWithResultSearchMovies(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }

  function handleFilterMoviesCards({ cards, search, checkbox }) {
    const { resultFiltered, resultFilteredOnlyBySearcyValue } =
      filterMoviesCards({
        cards,
        search,
        checkbox,
      });
    setFilteredMoviesCards(resultFiltered);
    setFilteredMoviesCardsOnlyBySearcyValue(resultFilteredOnlyBySearcyValue);
    !resultFiltered.length &&
      setMessageWithResultSearchMovies("Ничего не найдено");
    setVisiblePreloader(false);
  }

  // фильтр карточек по введенному ключевому слову в форму поиска и отмеченным флажкам.
  // заложена масштабируемость, для возможности фильтрации по нескольким чекбоксам.
  function filterMoviesCards({ cards, search, checkbox }) {
    const filteredMoviesCardsOnlyBySearcyValue = [];
    const filteredMoviesCards = cards.filter((card) => {
      // если не задано ключевое слово, не ищем по нему, ищем по оставшимся фильтрам
      const matchBySearchValue = search
        ? // передать массив с именами фильмов в функцию для поиска совпадения по ключевому слову.
          findMatchMovieName([card.nameRU, card.nameEN])
        : true;
      search &&
        matchBySearchValue &&
        filteredMoviesCardsOnlyBySearcyValue.push(card);
      return (
        // если совпадение по ключевому слову есть, передать картчоку в функцию проверки совпадений согласно установленным чекбоксам
        matchBySearchValue && findMatchCheckboxes(card)
      );
    });

    function findMatchMovieName(arrayWithCardNameS) {
      return arrayWithCardNameS.some(
        (name) => name && name.toLowerCase().includes(search)
      );
    }

    function findMatchCheckboxes(card) {
      // если флажок "короткометражки" отмечен, передать продолжительность фильма в функцию проверки совпадения по длительности.
      // если совпадение есть, инвертировать результат, чтобы условие не выполнилось, перейти к проверке следующего чекбокса
      if (checkbox && !findMatchMovieShort(card.duration)) {
        // если хотя бы один из чекбоксов не прошел проверку вернуть false
        return false;
      }
      // если все проверки (для каждого чекбокса) прошли успешно, вернуть true
      return true;
    }

    function findMatchMovieShort(duration) {
      return duration && duration <= 40;
    }

    return {
      resultFiltered: filteredMoviesCards,
      resultFilteredOnlyBySearcyValue: filteredMoviesCardsOnlyBySearcyValue,
    };
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    const defaultStringValueForCard =
      "данные отсутствовали в базе BeatfilmMovies";
    const defaultNumberValueForCard = 0;
    const defaultURLValueForImageCard = `https://api.nomoreparties.conodataavailable`;
    const defaultURLValueForTrailerCard = `https://www.youtube.comnodataavailable`;
    const cardWithRequiredFields = {
      country: card.country || defaultStringValueForCard,
      director: card.director || defaultStringValueForCard,
      duration: card.duration || defaultNumberValueForCard,
      year: card.year || defaultStringValueForCard,
      description: card.description || defaultStringValueForCard,
      image: card.image.url
        ? `https://api.nomoreparties.co${card.image.url}`
        : defaultURLValueForImageCard,
      trailer: card.trailerLink || defaultURLValueForTrailerCard,
      nameRU: card.nameRU || defaultStringValueForCard,
      nameEN: card.nameEN || defaultStringValueForCard,
      thumbnail: card.image.formats.thumbnail.url
        ? `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`
        : defaultURLValueForImageCard,
      // у каждой карточки должен быть уникальный id.
      // не возможно задать дефолтный id, иначе будет две карточки с одинаковым id.
      movieId: card.id,
    };
    saveMovieCard(jwt, cardWithRequiredFields)
      .then((card) => {
        setSavedMoviesCards([...savedMoviesCards, card]);
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
      });
  }

  function handleCardDelete(card) {
    const cardId =
      card._id || savedMoviesCards.find((i) => i.movieId === card.id)._id;
    const jwt = localStorage.getItem("jwt");
    deleteMovieCard(jwt, cardId)
      .then(() => {
        setSavedMoviesCards((state) =>
          state.filter((c) => c.movieId !== (card.movieId || card.id))
        );
        setFilteredSavedMoviesCards((state) =>
          state.filter((c) => c.movieId !== (card.movieId || card.id))
        );

        setFilteredSavedMoviesCardsOnlyBySearcyValue((state) =>
          state.filter((c) => c.movieId !== (card.movieId || card.id))
        );
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
      });
  }

  function handleAddMoreCards() {
    const currentNumberCards = displayedMoviesCards.length;
    const numberCardsInRow = calculateNumberMoviesCards({
      onButtonAddMoreCards: true,
    });
    const totalNumberCards =
      numberCardsInRow === 1
        ? currentNumberCards + 2
        : getNumberCardsForAlignLastRow(numberCardsInRow, currentNumberCards);
    setDisplayedMoviesCards(
      filteredMoviesCards.slice(
        0,
        totalNumberCards > filteredMoviesCards.length
          ? filteredMoviesCards.length
          : totalNumberCards
      )
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page page_align_center">
        <Header
          mainStyleHeader={mainStyleHeader}
          loggedIn={loggedIn}
          visibleHeaderFooter={visibleHeaderFooter}
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
              formSubmitSendingStatus={statusSubmitAuthorizationForms}
              messageWithResultSubmit={
                messageWithResultSubmitAuthorizationForms
              }
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
                  formSubmitSendingStatus={statusSubmitAuthorizationForms}
                  messageWithResultSubmit={
                    messageWithResultSubmitAuthorizationForms
                  }
                />
              )}
            </Route>
            <Route path="/sign-up">
              {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.*/}
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onRegister={onRegister}
                  formSubmitSendingStatus={statusSubmitAuthorizationForms}
                  messageWithResultSubmit={
                    messageWithResultSubmitAuthorizationForms
                  }
                />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              checkboxOn={shortMoviesCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              openPopupError={handleOpenErrorMessagePopup}
              loggedIn={loggedIn}
              visiblePreloader={visiblePreloader}
              filteredMoviesCards={filteredMoviesCards}
              moviesCards={displayedMoviesCards}
              onSearchMovies={onSearchMovies}
              searchMessageMovies={messageWithResultSearchMovies}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onAddMoreCard={handleAddMoreCards}
              savedMoviesCards={savedMoviesCards}
              previousValueSearchForm={searchValueMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              checkboxOn={shortSavedMoviesCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              locationSavedMovies={locationSavedMovies}
              openPopupError={handleOpenErrorMessagePopup}
              loggedIn={loggedIn}
              // если есть отфильтрованные сохраненные фильмы или форма поиска уже была отправлена,
              // показывать всегда все отфильтрованные сохраненные фильмы, иначе показать только все сохраненные фильмы.
              savedMoviesCards={
                filteredSavedMoviesCards.length || searchValueSavedMovies
                  ? filteredSavedMoviesCards
                  : savedMoviesCards
              }
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onSearchSavedMovies={onSearchSavedMovies}
              searchMessageSavedMovies={messageWithResultSearchSavedMovies}
              previousValueSearchForm={searchValueSavedMovies}
            />
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <Footer visibleHeaderFooter={visibleHeaderFooter} />
        <ErrorMessagePopup
          errorMessage={errorMessagePopupForError}
          onClose={handleCloseErrorMessagePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
