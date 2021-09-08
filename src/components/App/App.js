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
// импорт компонентов.
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
import Preloader from "../Preloader/Preloader";
// импорт сообщений ошибок.
import {
  AUTHORIZATION_ERRORS,
  MOVIE_CARD_ERRORS,
} from "../../utils/errorMessages";
// импорт информационных сообщений.
import {
  AUTHORIZATION_MESSAGES,
  AUTHORIZATION_STATUSES,
  MOVIE_SEARCH_FORM_MESSAGES,
} from "../../utils/informationalMessages";
import { DEFAULT_VALUES_API_DATA } from "../../utils/constants";

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
  // стейт отображения компонента Header.
  const [visibleHeader, setVisibleHeader] = useState(true);
  // стейт отображения компонента Footer.
  const [visibleFooter, setVisibleFooter] = useState(true);
  // стейт отображения прелоадера в процессе авторизации пользователя.
  const [visiblePreloaderLoggedIn, setVisiblePreloaderLoggedIn] =
    useState(false);
  // стейт отображения прелоадера в процессе загрузки фильмов.
  const [visiblePreloaderMovies, setVisiblePreloaderMovies] = useState(false);
  // стейт сообщения ошибки попапа для ошибок.
  const [errorMessagePopupForError, setErrorMessagePopupForError] =
    useState("");
  // стейт статуса лайка/дизлайка форм в формах фильмов.
  const [statusLikeDislikeMovieCard, setStatusLikeDislikeMovieCard] =
    useState(false);
  // стейт статуса отправки форм авторизации.
  const [statusSubmitAuthorizationForms, setStatusSubmitAuthorizationForms] =
    useState("");
  // стейт с сообщением результата отправки форм авторизации.
  const [
    messageWithResultSubmitAuthorizationForms,
    setMessageWithResultSubmitAuthorizationForms,
  ] = useState("");
  // стейт пути URL для перехода после авторизации пользователя.
  const [pathURL, setPathURL] = useState("");

  // стейт с ключевым словом поиска в форме фильмов.
  const [searchValueMovies, setSearchValueMovies] = useState("");
  // стейт чекбокса короткомертажных фильмов.
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по названию фильма.
  const [nameMoviesCheckbox, setNameMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по году фильма.
  const [yearMoviesCheckbox, setYearMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по стране фильма.
  const [countryMoviesCheckbox, setCountryMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по режиссеру фильма.
  const [directorMoviesCheckbox, setDirectorMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по описанию фильма.
  const [descriptionMoviesCheckbox, setDescriptionMoviesCheckbox] =
    useState(false);
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
  // стейт с общим количеством карточек для отображения. Если добавляли карточки кнопкой "Еще".
  const [totalNumberMoviesCards, setTotalNumberMoviesCards] = useState(0);

  // стейт с ключевым словом поиска в форме сохраненных фильмов.
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
      updateData();
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
    const route = location.pathname;
    // если пользователь переходит на защищенный роут через адрес в URL, записываем его в стейт, чтобы после авторизации перейти на этот роут.
    // т.к. ProtectedRoute заблокирует роут при пока не прошла авторизация.
    !loggedIn &&
      (route === "/saved-movies" ||
        route === "/movies" ||
        route === "/profile") &&
      setPathURL(route);
    // на всех роутах, кроме этого, установить главный стиль(белый фон) для компонента Header.
    if (route === "/") {
      setMainStyleHeader(true);
    } else {
      setMainStyleHeader(false);
    }
    // при переходе на роут, установить соответствующий стейт локации.
    if (route === "/saved-movies") {
      setLocationSavedMovies(true);
      // обновить результаты стейта фильтра с сохраненными карточками.
      loggedIn && onSearchSavedMovies(searchValueSavedMovies);
    } else {
      setLocationSavedMovies(false);
    }
    if (
      //  при переходе на данные роуты, отобразить компоненты Header и Footer, иначе скрыть.
      route === "/" ||
      route === "/movies" ||
      route === "/saved-movies"
    ) {
      setVisibleHeader(true);
      setVisibleFooter(true);
    } else {
      setVisibleHeader(false);
      setVisibleFooter(false);
    }
    if (route === "/profile") {
      setVisibleHeader(true);
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
    } else {
      // если в отфильтрованных только по слову ничего нет, тогда не обновляем стейт отфильтрованных карточек.
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
    const numberCards = calculateNumberMoviesCards();
    setDisplayedMoviesCards(
      filteredMoviesCards.slice(0, totalNumberMoviesCards || numberCards)
    );
    loggedIn &&
      localStorage.setItem(
        "totalNumberMoviesCards",
        totalNumberMoviesCards || numberCards
      );
    totalNumberMoviesCards && setTotalNumberMoviesCards(0);
  }, [filteredMoviesCards]);

  useEffect(() => {
    // если отфильтрованных карточек нет и есть слово в форме поиска.
    if (!filteredMoviesCards.length && searchValueMovies) {
      setMessageWithResultSearchMovies(
        MOVIE_SEARCH_FORM_MESSAGES.nothingWasFound
      );
      // иначе, если отфильтрованные сохраненные карточки есть.
    } else {
      setMessageWithResultSearchMovies("");
      // иначе, если нет отфильтрованных сохраненных карточек и отмечен чекбокс сохраненных фильмов и есть сохраненные карточки.
    }
  }, [filteredMoviesCards]);

  useEffect(() => {
    // если отфильтрованных сохраненных карточек нет и есть слово в форме поиска.
    if (!filteredSavedMoviesCards.length && searchValueSavedMovies) {
      setMessageWithResultSearchSavedMovies(
        MOVIE_SEARCH_FORM_MESSAGES.nothingWasFound
      );
      // иначе, если отфильтрованные сохраненные карточки есть.
    } else if (filteredSavedMoviesCards.length) {
      setMessageWithResultSearchSavedMovies("");
      // иначе, если нет отфильтрованных сохраненных карточек и отмечен чекбокс сохраненных фильмов и есть сохраненные карточки.
    } else if (
      !filteredSavedMoviesCards.length &&
      shortSavedMoviesCheckbox &&
      savedMoviesCards.length
    ) {
      setMessageWithResultSearchSavedMovies(
        MOVIE_SEARCH_FORM_MESSAGES.noSavedShortMovies
      );
      // сделано, чтобы была возможность фильтровать карточки нажатием на чекбокс.
      // т.к. при первом переходе на страницу, сразу отображаются все сохраненные карточк, а слово поиска не введено, и первое условие не сработает.
    } else {
      setMessageWithResultSearchSavedMovies(
        MOVIE_SEARCH_FORM_MESSAGES.noSavedMovies
      );
    }
  }, [filteredSavedMoviesCards]);

  // обработчик открытия модального окна с ошибкой.
  function handleOpenErrorMessagePopup(errorMessage) {
    setErrorMessagePopupForError(errorMessage);
  }

  // обработчик закрытия модального окна с ошибкой.
  function handleCloseErrorMessagePopup() {
    setErrorMessagePopupForError("");
  }

  function onRegister(name, email, password) {
    setStatusSubmitAuthorizationForms(AUTHORIZATION_STATUSES.registerNewUser);
    setMessageWithResultSubmitAuthorizationForms("");
    register(name, email, password)
      .then(() => {
        setMessageWithResultSubmitAuthorizationForms(
          AUTHORIZATION_MESSAGES.successfulRegistration
        );
        onLogin(email, password);
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setMessageWithResultSubmitAuthorizationForms(
          AUTHORIZATION_ERRORS.registration
        );
      })
      .finally(() => setStatusSubmitAuthorizationForms(""));
  }

  function onLogin(email, password) {
    setStatusSubmitAuthorizationForms(AUTHORIZATION_STATUSES.authorizationUser);
    setMessageWithResultSubmitAuthorizationForms("");
    login(email, password)
      .then((data) => {
        if (data.token) {
          setMessageWithResultSubmitAuthorizationForms(
            AUTHORIZATION_MESSAGES.successfulAuthorization
          );
          localStorage.setItem("jwt", data.token);
          handleDataLogin(data.token);
          setPathURL("/movies");
        }
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setMessageWithResultSubmitAuthorizationForms(
          AUTHORIZATION_ERRORS.authorization
        );
      })
      .finally(() => setStatusSubmitAuthorizationForms(""));
  }

  function onEditProfile(name, email) {
    setStatusSubmitAuthorizationForms(
      AUTHORIZATION_STATUSES.updatingProfileData
    );
    setMessageWithResultSubmitAuthorizationForms("");
    const jwt = localStorage.getItem("jwt");
    editProfile(name, email, jwt)
      .then((data) => {
        setCurrentUser(data);
        setMessageWithResultSubmitAuthorizationForms(
          AUTHORIZATION_MESSAGES.successfulProfileUpdate
        );
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setMessageWithResultSubmitAuthorizationForms(
          AUTHORIZATION_ERRORS.profileChanges
        );
      })
      .finally(() => setStatusSubmitAuthorizationForms(""));
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  // обработчик данных для авторизации.
  async function handleDataLogin(jwt) {
    setVisiblePreloaderLoggedIn(true);
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
          moviesCheckboxes,
          shortSavedMoviesCheckbox,
          totalNumberMoviesCards,
        } = getAllSavedValuesFromLocalStorage();
        moviesCards && setMoviesCards(moviesCards);
        searchValueMovies && setSearchValueMovies(searchValueMovies);
        searchValueSavedMovies &&
          setSearchValueSavedMovies(searchValueSavedMovies);
        moviesCheckboxes.name && setNameMoviesCheckbox(moviesCheckboxes.name);
        moviesCheckboxes.year && setYearMoviesCheckbox(moviesCheckboxes.year);
        moviesCheckboxes.country &&
          setCountryMoviesCheckbox(moviesCheckboxes.country);
        moviesCheckboxes.director &&
          setDirectorMoviesCheckbox(moviesCheckboxes.director);
        moviesCheckboxes.description &&
          setDescriptionMoviesCheckbox(moviesCheckboxes.description);
        moviesCheckboxes.short &&
          setShortMoviesCheckbox(moviesCheckboxes.short);
        shortSavedMoviesCheckbox &&
          setShortSavedMoviesCheckbox(shortSavedMoviesCheckbox);
        totalNumberMoviesCards &&
          setTotalNumberMoviesCards(totalNumberMoviesCards);
        setLoggedIn(true);
      }
    }
    setVisiblePreloaderLoggedIn(false);
  }

  function checkValidityToken(jwt) {
    return getCurrentUser(jwt)
      .then((res) => {
        if (res) {
          return res;
        }
      })
      .catch((err) => {
        setErrorMessagePopupForError(
          `${AUTHORIZATION_ERRORS.tokenValidation} ${err}`
        );
        removeItemsFromLocalStorage();
        resetStatesForRegisteredUser();
      });
  }

  function getSavedMoviesCardsFromAPI(jwt) {
    return getSavedMoviesCards(jwt)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        setErrorMessagePopupForError(
          `${MOVIE_CARD_ERRORS.getSavedMovies} ${err}`
        );
      });
  }

  function getAllSavedValuesFromLocalStorage() {
    const searchValueMovies = getSearchValueMoviesFromLocalStorage();
    const searchValueSavedMovies = getSearchValueSavedMoviesFromLocalStorage();
    const moviesCheckboxes = getMoviesCheckboxesFromLocalStorage();
    const shortSavedMoviesCheckbox =
      getshortSavedMoviesCheckboxFromLocalStorage();
    const moviesCards = getMoviesCardsFromLocalStorage();
    const totalNumberMoviesCards = getTotalNumberMoviesCardsFromLocalStorage();
    return {
      searchValueMovies,
      searchValueSavedMovies,
      moviesCheckboxes,
      shortSavedMoviesCheckbox,
      moviesCards,
      totalNumberMoviesCards,
    };
  }

  function getSearchValueMoviesFromLocalStorage() {
    return localStorage.getItem("searchValueMovies");
  }

  function getSearchValueSavedMoviesFromLocalStorage() {
    return localStorage.getItem("searchValueSavedMovies");
  }

  function getMoviesCheckboxesFromLocalStorage() {
    const checkboxes = {
      name: localStorage.getItem("nameMoviesCheckbox") === "true",
      year: localStorage.getItem("yearMoviesCheckbox") === "true",
      country: localStorage.getItem("countryMoviesCheckbox") === "true",
      director: localStorage.getItem("directorMoviesCheckbox") === "true",
      description: localStorage.getItem("descriptionMoviesCheckbox") === "true",
      short: localStorage.getItem("shortMoviesCheckbox") === "true",
    };
    return checkboxes;
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

  function getTotalNumberMoviesCardsFromLocalStorage() {
    return localStorage.getItem("totalNumberMoviesCards");
  }

  function removeItemsFromLocalStorage() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("moviesCards");
    localStorage.removeItem("searchValueMovies");
    localStorage.removeItem("searchValueSavedMovies");
    localStorage.removeItem("shortMoviesCheckbox");
    localStorage.removeItem("shortSavedMoviesCheckbox");
    localStorage.removeItem("totalNumberMoviesCards");
  }

  function resetStatesForRegisteredUser() {
    setCurrentUser({});
    setSearchValueMovies("");
    setSearchValueSavedMovies("");
    setShortMoviesCheckbox(false);
    setShortSavedMoviesCheckbox(false);
    setMessageWithResultSearchMovies("");
    setMessageWithResultSearchSavedMovies("");
    setMoviesCards([]);
    setSavedMoviesCards([]);
    setFilteredMoviesCards([]);
    setFilteredSavedMoviesCards([]);
    setFilteredMoviesCardsOnlyBySearcyValue([]);
    setFilteredSavedMoviesCardsOnlyBySearcyValue([]);
  }

  function updateData() {
    searchValueMovies && onSearchMovies(searchValueMovies);
    (searchValueSavedMovies || savedMoviesCards.length) &&
      onSearchSavedMovies(searchValueSavedMovies);
    pathURL && history.push(pathURL);
    setPathURL("");
  }

  function handleShortMovieCheckbox() {
    locationSavedMovies
      ? setShortSavedMoviesCheckbox(!shortSavedMoviesCheckbox)
      : setShortMoviesCheckbox(!shortMoviesCheckbox);
  }

  async function onSearchMovies(searchValue) {
    setVisiblePreloaderMovies(true);
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
    setVisiblePreloaderMovies(true);
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
    setVisiblePreloaderMovies(false);
  }

  function getMoviesCardsFromAPI() {
    return api
      .getMovieCards()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${err}`);
        setVisiblePreloaderMovies(false);
        setMessageWithResultSearchMovies(MOVIE_CARD_ERRORS.getMovies);
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
    setVisiblePreloaderMovies(false);
  }

  // фильтр карточек по введенному ключевому слову в форму поиска и отмеченным флажкам.
  // заложена масштабируемость, для возможности фильтрации по нескольким чекбоксам.
  function filterMoviesCards({ cards, search, checkbox }) {
    console.log("фильтр");
    const filteredMoviesCardsOnlyBySearcyValue = [];
    const filteredMoviesCards = cards.filter((card) => {
      // если не задано ключевое слово, не ищем по нему, ищем по оставшимся фильтрам.
      const matchBySearchValue = search
        ? // передать массив с именами фильмов в функцию для поиска совпадения по ключевому слову.
          findMatchSearchValueCheckboxes(card)
        : true;
      search &&
        matchBySearchValue &&
        filteredMoviesCardsOnlyBySearcyValue.push(card);
      return (
        // если совпадение по ключевому слову есть, передать картчоку в функцию проверки совпадений согласно установленным чекбоксам сортировки.
        matchBySearchValue && findMatchSortingCheckboxes(card)
      );
    });

    function findMatchSearchValueCheckboxes(card) {
      if (yearMoviesCheckbox && !findMatchSearchValue(card.year)) return false;
      if (countryMoviesCheckbox && !findMatchSearchValue(card.country))
        return false;
      if (directorMoviesCheckbox && !findMatchSearchValue(card.director))
        return false;
      if (descriptionMoviesCheckbox && !findMatchSearchValue(card.description))
        return false;
      if (nameMoviesCheckbox && !findMatchMovieName([card.nameRU, card.nameEN]))
        return false;
      return true;
    }

    function findMatchSortingCheckboxes(card) {
      if (checkbox && !findMatchMovieShort(card.duration)) {
        // если хотя бы один из чекбоксов не прошел проверку вернуть false.
        return false;
      }
      // если все проверки (для каждого чекбокса) прошли успешно, вернуть true.
      return true;
    }

    function findMatchMovieName(arrayWithCardNameS) {
      return arrayWithCardNameS.some(
        (name) => name && name.toLowerCase().includes(search)
      );
    }

    function findMatchSearchValue(value) {
      return value && value.toLowerCase().includes(search);
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
    setStatusLikeDislikeMovieCard(true);
    const jwt = localStorage.getItem("jwt");
    const cardWithRequiredFields = {
      country: card.country || DEFAULT_VALUES_API_DATA.string,
      director: card.director || DEFAULT_VALUES_API_DATA.string,
      duration: card.duration || DEFAULT_VALUES_API_DATA.number,
      year: card.year || DEFAULT_VALUES_API_DATA.string,
      description: card.description || DEFAULT_VALUES_API_DATA.string,
      image: card.image.url
        ? `https://api.nomoreparties.co${card.image.url}`
        : DEFAULT_VALUES_API_DATA.URLForImage,
      trailer: card.trailerLink || DEFAULT_VALUES_API_DATA.URLForVideo,
      nameRU: card.nameRU || DEFAULT_VALUES_API_DATA.string,
      nameEN: card.nameEN || DEFAULT_VALUES_API_DATA.string,
      thumbnail: card.image.formats.thumbnail.url
        ? `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`
        : DEFAULT_VALUES_API_DATA.URLForImage,
      // у каждой карточки должен быть уникальный id.
      // не возможно задать дефолтный id, иначе будет две карточки с одинаковым id.
      movieId: card.id,
    };
    saveMovieCard(jwt, cardWithRequiredFields)
      .then((card) => {
        setSavedMoviesCards([...savedMoviesCards, card]);
      })
      .catch((err) => {
        setErrorMessagePopupForError(`${MOVIE_CARD_ERRORS.likeMovies} ${err}`);
      })
      .finally(() => setStatusLikeDislikeMovieCard(false));
  }

  function handleCardDelete(card) {
    setStatusLikeDislikeMovieCard(true);
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
        setErrorMessagePopupForError(
          `${MOVIE_CARD_ERRORS.deleteMovies} ${err}`
        );
      })
      .finally(() => setStatusLikeDislikeMovieCard(false));
  }

  function handleAddMoreCards() {
    const currentNumberCards = displayedMoviesCards.length;
    const numberCardsInRow = calculateNumberMoviesCards({
      onButtonAddMoreCards: true,
    });
    let totalNumberCards =
      numberCardsInRow === 1
        ? currentNumberCards + 2
        : getNumberCardsForAlignLastRow(numberCardsInRow, currentNumberCards);
    while (totalNumberCards > filteredMoviesCards.length) --totalNumberCards;
    localStorage.setItem("totalNumberMoviesCards", totalNumberCards);
    setDisplayedMoviesCards(filteredMoviesCards.slice(0, totalNumberCards));
  }

  function handleNameMoviesCheckbox() {
    localStorage.setItem("nameMoviesCheckbox", !nameMoviesCheckbox);
    setNameMoviesCheckbox(!nameMoviesCheckbox);
  }

  function handleYearMoviesCheckbox() {
    localStorage.setItem("yearMoviesCheckbox", !yearMoviesCheckbox);
    setYearMoviesCheckbox(!yearMoviesCheckbox);
  }

  function handleCountryMoviesCheckbox() {
    localStorage.setItem("countryMoviesCheckbox", !countryMoviesCheckbox);
    setCountryMoviesCheckbox(!countryMoviesCheckbox);
  }

  function handleDirectorMoviesCheckbox() {
    localStorage.setItem("directorMoviesCheckbox", !directorMoviesCheckbox);
    setDirectorMoviesCheckbox(!directorMoviesCheckbox);
  }

  function handleDescriptionMoviesCheckbox() {
    localStorage.setItem(
      "descriptionMoviesCheckbox",
      !descriptionMoviesCheckbox
    );
    setDescriptionMoviesCheckbox(!descriptionMoviesCheckbox);
  }

  function checkMinimumOneEnabledSearchValueCheckboxes() {
    return (
      nameMoviesCheckbox ||
      yearMoviesCheckbox ||
      countryMoviesCheckbox ||
      directorMoviesCheckbox ||
      descriptionMoviesCheckbox
    );
  }

  useEffect(() => {
    if (loggedIn) {
      checkMinimumOneEnabledSearchValueCheckboxes()
        ? searchValueMovies && onSearchMovies(searchValueMovies)
        : // т.к. setNameMoviesCheckbox(true) вернет undefined, для выполнения следующей за ним операции, использутеся оператор ||.
          setNameMoviesCheckbox(true) ||
          localStorage.setItem("nameMoviesCheckbox", true);
    }
  }, [
    nameMoviesCheckbox,
    yearMoviesCheckbox,
    countryMoviesCheckbox,
    directorMoviesCheckbox,
    descriptionMoviesCheckbox,
  ]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page page_align_center">
        {!visiblePreloaderLoggedIn && (
          <Header
            mainStyleHeader={mainStyleHeader}
            loggedIn={loggedIn}
            visibleHeader={visibleHeader}
          />
        )}
        <main className="content">
          {visiblePreloaderLoggedIn ? (
            <Preloader type="logged-in" />
          ) : (
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedRoute
                exact
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
              <Route exact path="/sign-in">
                {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.*/}
                {localStorage.getItem("jwt") ? (
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
              <Route exact path="/sign-up">
                {/* если пользователь авторизовался, запрещаем переход на страницу авторизации по URL-адресу данного роута.*/}
                {localStorage.getItem("jwt") ? (
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
                exact
                path="/movies"
                component={Movies}
                moviesSearchValueCheckboxes={[
                  {
                    title: "Название",
                    state: nameMoviesCheckbox,
                    handler: handleNameMoviesCheckbox,
                  },
                  {
                    title: "Год",
                    state: yearMoviesCheckbox,
                    handler: handleYearMoviesCheckbox,
                  },
                  {
                    title: "Страна",
                    state: countryMoviesCheckbox,
                    handler: handleCountryMoviesCheckbox,
                  },
                  {
                    title: "Режиссер",
                    state: directorMoviesCheckbox,
                    handler: handleDirectorMoviesCheckbox,
                  },
                  {
                    title: "Описание",
                    state: descriptionMoviesCheckbox,
                    handler: handleDescriptionMoviesCheckbox,
                  },
                ]}
                moviesSortingCheckboxes={[
                  {
                    title: "Короткометражки",
                    state: shortMoviesCheckbox,
                    handler: handleShortMovieCheckbox,
                  },
                ]}
                openPopupError={handleOpenErrorMessagePopup}
                loggedIn={loggedIn}
                visiblePreloader={visiblePreloaderMovies}
                filteredMoviesCards={filteredMoviesCards}
                moviesCards={displayedMoviesCards}
                onSearchMovies={onSearchMovies}
                searchMessageMovies={messageWithResultSearchMovies}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddMoreCard={handleAddMoreCards}
                savedMoviesCards={savedMoviesCards}
                previousValueSearchForm={searchValueMovies}
                statusLikeDislikeMovieCard={statusLikeDislikeMovieCard}
              />
              <ProtectedRoute
                exact
                path="/saved-movies"
                component={SavedMovies}
                checkboxOn={shortSavedMoviesCheckbox}
                handleShortMovieCheckbox={handleShortMovieCheckbox}
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
          )}
        </main>
        {!visiblePreloaderLoggedIn && <Footer visibleFooter={visibleFooter} />}
        <ErrorMessagePopup
          errorMessage={errorMessagePopupForError}
          onClose={handleCloseErrorMessagePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
