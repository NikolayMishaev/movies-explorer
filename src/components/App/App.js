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
import { DEFAULT_VALUES_API_DATA } from "../../utils/constants";
import {
  calculateNumberMoviesCards,
  getNumberCardsForAlignLastRow,
  filterMoviesCards,
  checkMinimumOneEnabledSearchValueCheckboxes,
  sortAlphabetically,
} from "../../utils/utils";
import {
  getAllSavedValuesFromLocalStorage,
  removeItemsFromLocalStorage,
  removeMoviesCheckboxes,
  removeSavedMoviesCheckboxes,
} from "../../utils/localStorage";
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
// импорт компонентов.
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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

export default function App() {
  const location = useLocation();
  const history = useHistory();

  // общие стейты приложения.
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

  // стейты чекбосов страницы "Фильмы".
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
  // стейт чекбокса короткомертажных фильмов.
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false);
  // стейт чекбокса сортировки по алфавиту фильмов.
  const [alphabetMoviesCheckbox, setAlphabetMoviesCheckbox] = useState(false);
  // стейт чекбокса мульти выбора чекбокосов фильмов.
  const [multiMoviesCheckbox, setMultiMoviesCheckbox] = useState(false);

  // остальные стейты страницы "Фильмы".
  // стейт с ключевым словом поиска в форме фильмов.
  const [searchValueMovies, setSearchValueMovies] = useState("");
  // стейт сообщения с результатами поиска в форме поиска фильмов.
  const [messageWithResultSearchMovies, setMessageWithResultSearchMovies] =
    useState("");
  // стейт всех карточек фильмов.
  const [moviesCards, setMoviesCards] = useState([]);
  // стейт отфильтрованных карточек фильмов.
  const [filteredMoviesCards, setFilteredMoviesCards] = useState([]);
  // стейт отфильтрованных карточек фильмов только по ключевому слову.
  // стейт нужен для того, чтобы при отметке чекбоксов из группы "Сортировка",
  // фильтрация проходила уже по отсортированным карточкам по ключевому слову, а не по всем имеющимся карточкам
  const [
    filteredMoviesCardsOnlyBySearcyValue,
    setFilteredMoviesCardsOnlyBySearcyValue,
  ] = useState([]);
  // стейт отображаемых карточек фильмов.
  const [displayedMoviesCards, setDisplayedMoviesCards] = useState([]);
  // стейт с общим количеством карточек для отображения. Если добавляли карточки кнопкой "Еще".
  const [totalNumberMoviesCards, setTotalNumberMoviesCards] = useState(0);

  // стейты чекбосов страницы "Сохраненные фильмы".
  // стейт чекбокса поиска по названию фильма.
  const [nameSavedMoviesCheckbox, setNameSavedMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по году фильма.
  const [yearSavedMoviesCheckbox, setYearSavedMoviesCheckbox] = useState(false);
  // стейт чекбокса поиска по стране фильма.
  const [countrySavedMoviesCheckbox, setCountrySavedMoviesCheckbox] =
    useState(false);
  // стейт чекбокса поиска по режиссеру фильма.
  const [directorSavedMoviesCheckbox, setDirectorSavedMoviesCheckbox] =
    useState(false);
  // стейт чекбокса поиска по описанию фильма.
  const [descriptionSavedMoviesCheckbox, setDescriptionSavedMoviesCheckbox] =
    useState(false);
  // стейт чекбокса короткомертажных сохнаненных фильмов.
  const [shortSavedMoviesCheckbox, setShortSavedMoviesCheckbox] =
    useState(false);

  // остальные стейты страницы "Сохраненные фильмы".
  // стейт с ключевым словом поиска в форме сохраненных фильмов.
  const [searchValueSavedMovies, setSearchValueSavedMovies] = useState("");
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
    // если пользователь переходит на защищенный роут через адрес в URL,
    // записываем его в стейт, чтобы после авторизации перейти на этот роут.
    // т.к. ProtectedRoute будет редиректить до прохождении авторизации.
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
    if (loggedIn) {
      checkMinimumOneEnabledSearchValueCheckboxes({
        name: nameMoviesCheckbox,
        year: yearMoviesCheckbox,
        country: countryMoviesCheckbox,
        director: directorMoviesCheckbox,
        description: descriptionMoviesCheckbox,
      })
        ? searchValueMovies && onSearchMovies(searchValueMovies)
        : // т.к. setNameMoviesCheckbox(true) вернет undefined,
          // для выполнения следующей за ним операции, использутеся оператор ||.
          setNameMoviesCheckbox(true) ||
          localStorage.setItem("nameMoviesCheckbox", true);
    }
  }, [
    nameMoviesCheckbox,
    yearMoviesCheckbox,
    countryMoviesCheckbox,
    directorMoviesCheckbox,
    descriptionMoviesCheckbox,
    loggedIn,
  ]);

  useEffect(() => {
    loggedIn &&
      localStorage.setItem("shortMoviesCheckbox", shortMoviesCheckbox);
    if (shortMoviesCheckbox && filteredMoviesCards.length) {
      const { resultFiltered } = filterMoviesCards({
        cards: filteredMoviesCards,
        checkboxes: {
          short: shortMoviesCheckbox,
          alphabet: alphabetMoviesCheckbox,
        },
      });
      setFilteredMoviesCards(resultFiltered);
    } else {
      // если в отфильтрованных только по слову ничего нет, тогда не обновляем стейт отфильтрованных карточек.
      filteredMoviesCardsOnlyBySearcyValue.length &&
        setFilteredMoviesCards(
          alphabetMoviesCheckbox
            ? [...sortAlphabetically(filteredMoviesCardsOnlyBySearcyValue)]
            : filteredMoviesCardsOnlyBySearcyValue
        );
    }
  }, [shortMoviesCheckbox]);

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
    // если отфильтрованных карточек нет и есть слово в форме поиска.
    if (!filteredMoviesCards.length && searchValueMovies) {
      setMessageWithResultSearchMovies(
        MOVIE_SEARCH_FORM_MESSAGES.nothingWasFound
      );
      // иначе, если отфильтрованные сохраненные карточки есть.
    } else {
      setMessageWithResultSearchMovies("");
    }
  }, [filteredMoviesCards]);

  useEffect(() => {
    if (loggedIn) {
      checkMinimumOneEnabledSearchValueCheckboxes({
        name: nameSavedMoviesCheckbox,
        year: yearSavedMoviesCheckbox,
        country: countrySavedMoviesCheckbox,
        director: directorSavedMoviesCheckbox,
        description: descriptionSavedMoviesCheckbox,
      })
        ? searchValueSavedMovies && onSearchSavedMovies(searchValueSavedMovies)
        : // т.к. setNameSavedMoviesCheckbox(true) вернет undefined, для выполнения следующей за ним операции, использутеся оператор ||.
          setNameSavedMoviesCheckbox(true) ||
          localStorage.setItem("nameSavedMoviesCheckbox", true);
    }
  }, [
    nameSavedMoviesCheckbox,
    yearSavedMoviesCheckbox,
    countrySavedMoviesCheckbox,
    directorSavedMoviesCheckbox,
    descriptionSavedMoviesCheckbox,
    loggedIn,
  ]);

  useEffect(() => {
    const checkboxes = {
      short: shortSavedMoviesCheckbox,
    };
    loggedIn &&
      localStorage.setItem(
        "shortSavedMoviesCheckbox",
        shortSavedMoviesCheckbox
      );
    if (shortSavedMoviesCheckbox && filteredSavedMoviesCards.length) {
      const { resultFiltered } = filterMoviesCards({
        cards: filteredSavedMoviesCards,
        checkboxes,
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
        checkboxes,
      });
      setFilteredSavedMoviesCards(resultFiltered);
      setFilteredSavedMoviesCardsOnlyBySearcyValue(savedMoviesCards);
    }
  }, [shortSavedMoviesCheckbox]);

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
      // сделано, чтобы была возможность фильтровать карточки нажатием на чекбокс до поиска.
      // т.к. при первом переходе на страницу, сразу отображаются все сохраненные карточки.
    } else {
      setMessageWithResultSearchSavedMovies(
        MOVIE_SEARCH_FORM_MESSAGES.noSavedMovies
      );
    }
  }, [filteredSavedMoviesCards]);

  // обработчик закрытия модального окна с ошибкой.
  function handleCloseErrorMessagePopup() {
    setErrorMessagePopupForError("");
  }

  // обработчик регистрации.
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

  // обработчик авторизации.
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

  // обработчик редактирования профиля.
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

  // обработчик выхода из аккаунта.
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
          savedMoviesCheckboxes,
          totalNumberMoviesCards,
        } = getAllSavedValuesFromLocalStorage();
        moviesCards && setMoviesCards(moviesCards);
        searchValueMovies && setSearchValueMovies(searchValueMovies);
        searchValueSavedMovies &&
          setSearchValueSavedMovies(searchValueSavedMovies);
        setNameMoviesCheckbox(moviesCheckboxes.name);
        setYearMoviesCheckbox(moviesCheckboxes.year);
        setCountryMoviesCheckbox(moviesCheckboxes.country);
        setDirectorMoviesCheckbox(moviesCheckboxes.director);
        setDescriptionMoviesCheckbox(moviesCheckboxes.description);
        setShortMoviesCheckbox(moviesCheckboxes.short);
        setNameSavedMoviesCheckbox(savedMoviesCheckboxes.name);
        setYearSavedMoviesCheckbox(savedMoviesCheckboxes.year);
        setCountrySavedMoviesCheckbox(savedMoviesCheckboxes.country);
        setDirectorSavedMoviesCheckbox(savedMoviesCheckboxes.director);
        setDescriptionSavedMoviesCheckbox(savedMoviesCheckboxes.description);
        setShortSavedMoviesCheckbox(savedMoviesCheckboxes.short);
        totalNumberMoviesCards &&
          setTotalNumberMoviesCards(totalNumberMoviesCards);
        setLoggedIn(true);
      }
    }
    setVisiblePreloaderLoggedIn(false);
  }

  // проверить валидност. токена.
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

  // получить карточки сохраненных фильмов из API.
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

  // сбросить все стейты приложения.
  function resetStatesForRegisteredUser() {
    setCurrentUser({});
    setSearchValueMovies("");
    setSearchValueSavedMovies("");
    setNameMoviesCheckbox(true);
    setYearMoviesCheckbox(false);
    setCountryMoviesCheckbox(false);
    setDirectorMoviesCheckbox(false);
    setDescriptionMoviesCheckbox(false);
    setShortMoviesCheckbox(false);
    setNameSavedMoviesCheckbox(true);
    setYearSavedMoviesCheckbox(false);
    setCountrySavedMoviesCheckbox(false);
    setDirectorSavedMoviesCheckbox(false);
    setDescriptionSavedMoviesCheckbox(false);
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

  // обновить данные приложения.
  function updateData() {
    searchValueMovies && onSearchMovies(searchValueMovies);
    (searchValueSavedMovies || savedMoviesCards.length) &&
      onSearchSavedMovies(searchValueSavedMovies);
    pathURL && history.push(pathURL);
    setPathURL("");
  }

  // обработчик чекбокса короткометражных фильмов.
  function handleShortMoviesCheckbox() {
    locationSavedMovies
      ? setShortSavedMoviesCheckbox(!shortSavedMoviesCheckbox)
      : setShortMoviesCheckbox(!shortMoviesCheckbox);
  }

  // найти фильмы.
  async function onSearchMovies(searchValue) {
    setVisiblePreloaderMovies(true);
    setSearchValueMovies(searchValue);
    localStorage.setItem("searchValueMovies", searchValue);
    setMessageWithResultSearchMovies("");
    const checkboxes = {
      name: nameMoviesCheckbox,
      year: yearMoviesCheckbox,
      country: countryMoviesCheckbox,
      director: directorMoviesCheckbox,
      description: descriptionMoviesCheckbox,
      short: shortMoviesCheckbox,
      alphabet: alphabetMoviesCheckbox,
    };
    if (!moviesCards.length) {
      const moviesCards = await getMoviesCardsFromAPI();
      if (moviesCards) {
        localStorage.setItem("moviesCards", JSON.stringify(moviesCards));
        setMoviesCards(moviesCards);
        handleFilterMoviesCards({
          cards: moviesCards,
          search: searchValue,
          checkboxes,
        });
      }
    } else {
      handleFilterMoviesCards({
        cards: moviesCards,
        search: searchValue,
        checkboxes,
      });
    }
  }

  // найти сохраненные фильмы
  function onSearchSavedMovies(searchValue) {
    setVisiblePreloaderMovies(true);
    setSearchValueSavedMovies(searchValue);
    localStorage.setItem("searchValueSavedMovies", searchValue);
    setMessageWithResultSearchSavedMovies("");
    const { resultFiltered, resultFilteredOnlyBySearcyValue } =
      filterMoviesCards({
        cards: savedMoviesCards,
        search: searchValue,
        checkboxes: {
          name: nameSavedMoviesCheckbox,
          year: yearSavedMoviesCheckbox,
          country: countrySavedMoviesCheckbox,
          director: directorSavedMoviesCheckbox,
          description: descriptionSavedMoviesCheckbox,
          short: shortSavedMoviesCheckbox,
        },
      });
    setFilteredSavedMoviesCards(resultFiltered);
    setFilteredSavedMoviesCardsOnlyBySearcyValue(
      searchValue ? resultFilteredOnlyBySearcyValue : savedMoviesCards
    );
    setVisiblePreloaderMovies(false);
  }

  // получить карточки фильмов из API.
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

  function handleFilterMoviesCards({ cards, search, checkboxes }) {
    const { resultFiltered, resultFilteredOnlyBySearcyValue } =
      filterMoviesCards({
        cards,
        search,
        checkboxes,
      });
    setFilteredMoviesCards(resultFiltered);
    setFilteredMoviesCardsOnlyBySearcyValue(resultFilteredOnlyBySearcyValue);
    setVisiblePreloaderMovies(false);
  }

  // обработчик лайков карточек.
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

  // обработчик удаления или дизлайков карточек.
  function handleCardDelete(card) {
    setStatusLikeDislikeMovieCard(true);
    const jwt = localStorage.getItem("jwt");
    const cardId =
      card._id || savedMoviesCards.find((i) => i.movieId === card.id)._id;
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

  // обработчик добавления карточек для отображения.
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

  // обработчики чекбосов на странице "Фильмы".

  function handleNameMoviesCheckbox() {
    localStorage.setItem("nameMoviesCheckbox", !nameMoviesCheckbox);
    if (!multiMoviesCheckbox) {
      resetAllStatesMoviesCheckboxes();
      setNameMoviesCheckbox(true);
    } else {
      setNameMoviesCheckbox(!nameMoviesCheckbox);
    }
  }

  function handleYearMoviesCheckbox() {
    localStorage.setItem("yearMoviesCheckbox", !yearMoviesCheckbox);
    if (!multiMoviesCheckbox) {
      resetAllStatesMoviesCheckboxes();
      setYearMoviesCheckbox(true);
    } else {
      setYearMoviesCheckbox(!yearMoviesCheckbox);
    }
  }

  function handleCountryMoviesCheckbox() {
    localStorage.setItem("countryMoviesCheckbox", !countryMoviesCheckbox);
    if (!multiMoviesCheckbox) {
      resetAllStatesMoviesCheckboxes();
      setCountryMoviesCheckbox(true);
    } else {
      setCountryMoviesCheckbox(!countryMoviesCheckbox);
    }
  }

  function handleDirectorMoviesCheckbox() {
    localStorage.setItem("directorMoviesCheckbox", !directorMoviesCheckbox);
    if (!multiMoviesCheckbox) {
      resetAllStatesMoviesCheckboxes();
      setDirectorMoviesCheckbox(true);
    } else {
      setDirectorMoviesCheckbox(!directorMoviesCheckbox);
    }
  }

  function handleDescriptionMoviesCheckbox() {
    localStorage.setItem(
      "descriptionMoviesCheckbox",
      !descriptionMoviesCheckbox
    );
    if (!multiMoviesCheckbox) {
      resetAllStatesMoviesCheckboxes();
      setDescriptionMoviesCheckbox(true);
    } else {
      setDescriptionMoviesCheckbox(!descriptionMoviesCheckbox);
    }
  }

  function resetAllStatesMoviesCheckboxes() {
    setNameMoviesCheckbox(false);
    setYearMoviesCheckbox(false);
    setCountryMoviesCheckbox(false);
    setDirectorMoviesCheckbox(false);
    setDescriptionMoviesCheckbox(false);
  }

  // обработчики чекбосов на странице "Сохраненные фильмы".

  function handleNameSavedMoviesCheckbox() {
    localStorage.setItem("nameSavedMoviesCheckbox", !nameSavedMoviesCheckbox);
    setNameSavedMoviesCheckbox(!nameSavedMoviesCheckbox);
  }

  function handleYearSavedMoviesCheckbox() {
    localStorage.setItem("yearSavedMoviesCheckbox", !yearSavedMoviesCheckbox);
    setYearSavedMoviesCheckbox(!yearSavedMoviesCheckbox);
  }

  function handleCountrySavedMoviesCheckbox() {
    localStorage.setItem(
      "countrySavedMoviesCheckbox",
      !countrySavedMoviesCheckbox
    );
    setCountrySavedMoviesCheckbox(!countrySavedMoviesCheckbox);
  }

  function handleDirectorSavedMoviesCheckbox() {
    localStorage.setItem(
      "directorSavedMoviesCheckbox",
      !directorSavedMoviesCheckbox
    );
    setDirectorSavedMoviesCheckbox(!directorSavedMoviesCheckbox);
  }

  function handleDescriptionSavedMoviesCheckbox() {
    localStorage.setItem(
      "descriptionSavedMoviesCheckbox",
      !descriptionSavedMoviesCheckbox
    );
    setDescriptionSavedMoviesCheckbox(!descriptionSavedMoviesCheckbox);
  }

  function handleResetMovies() {
    localStorage.removeItem("searchValueMovies");
    removeMoviesCheckboxes();
    window.location.reload();
  }

  function handleResetSavedMovies() {
    localStorage.removeItem("searchValueSavedMovies");
    removeSavedMoviesCheckboxes();
    window.location.reload();
  }

  function handleAlphabetMoviesCheckbox() {
    localStorage.setItem("alphabetMoviesCheckbox", !alphabetMoviesCheckbox);
    setAlphabetMoviesCheckbox(!alphabetMoviesCheckbox);
  }

  useEffect(() => {
    if (loggedIn) {
      alphabetMoviesCheckbox
        ? setFilteredMoviesCards([...sortAlphabetically(filteredMoviesCards)])
        : onSearchMovies(searchValueMovies);
    }
  }, [alphabetMoviesCheckbox]);

  function handleMultiMoviesCheckbox() {
    localStorage.setItem("multiMoviesCheckbox", !multiMoviesCheckbox);
    setMultiMoviesCheckbox(!multiMoviesCheckbox);
  }

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
                    handler: handleShortMoviesCheckbox,
                  },
                  {
                    title: "Алфавит",
                    state: alphabetMoviesCheckbox,
                    handler: handleAlphabetMoviesCheckbox,
                  },
                ]}
                moviesSettingsButtons={[
                  {
                    title: "Мульти",
                    state: multiMoviesCheckbox,
                    handler: handleMultiMoviesCheckbox,
                    type: "checkbox,",
                    className: "multi",
                  },
                  {
                    title: "Сбросить",
                    handler: handleResetMovies,
                    type: "button",
                  },
                ]}
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
                savedMoviesSearchValueCheckboxes={[
                  {
                    title: "Название",
                    state: nameSavedMoviesCheckbox,
                    handler: handleNameSavedMoviesCheckbox,
                  },
                  {
                    title: "Год",
                    state: yearSavedMoviesCheckbox,
                    handler: handleYearSavedMoviesCheckbox,
                  },
                  {
                    title: "Страна",
                    state: countrySavedMoviesCheckbox,
                    handler: handleCountrySavedMoviesCheckbox,
                  },
                  {
                    title: "Режиссер",
                    state: directorSavedMoviesCheckbox,
                    handler: handleDirectorSavedMoviesCheckbox,
                  },
                  {
                    title: "Описание",
                    state: descriptionSavedMoviesCheckbox,
                    handler: handleDescriptionSavedMoviesCheckbox,
                  },
                ]}
                savedMoviesSortingCheckboxes={[
                  {
                    title: "Короткометражки",
                    state: shortSavedMoviesCheckbox,
                    handler: handleShortMoviesCheckbox,
                  },
                ]}
                savedMoviesSettingsButtons={[
                  {
                    title: "Сбросить",
                    handler: handleResetSavedMovies,
                  },
                ]}
                locationSavedMovies={locationSavedMovies}
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
