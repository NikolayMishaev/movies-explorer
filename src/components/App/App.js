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
  const [loggedIn, setLoggedIn] = useState(true);
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
  // стейт состояние обработки сабмита форм регистр авториз профиль.
  const [formSubmitSendingStatus, setFormSubmitSendingStatus] = useState("");
  // стейт с результатом сабмита форм регистр авториз профиль.
  const [formSubmitStatus, setFormSubmitStatus] = useState("");
  // стейт состояния отображения прелоадера в форме поиска фильмов.
  const [preloaderVisible, setPreloaderVisible] = useState(false);

  // стейт сообщения с результатами поиска в форме поиска фильмов.
  const [searchMessage, setSearchMessage] = useState("");
  // стейт с данными всех карточек фильмов полученных из API.
  const [moviesCards, setMoviesCards] = useState([]);
  // стейт с отфильтрованными карточками.
  const [filteredMoviesCards, setFilteredMoviesCards] = useState([]);
  // стейт с отфильтрованными карточками только по ключевому слову.
  const [
    filteredMoviesCardsOnlyBySearcyValue,
    setFilteredMoviesCardsOnlyBySearcyValue,
  ] = useState([]);
  // стейт с ключевым словом поиска в форме фильмов
  const [searchValueMovies, setSearchValueMovies] = useState("");
  // стейт чекбокса короткомертажных фильмов.
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false);

  // стейт сообщения с результатами поиска в форме поиска сохраненных фильмов.
  const [searchMessageSavedMovies, setSearchMessageSavedMovies] = useState("");
  // стейт с данными всех карточек сохраненных фильмов полученных из API.
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  // стейт с отфильтрованными сохраненными карточками.
  const [filteredSavedMoviesCards, setFilteredSavedMoviesCards] = useState([]);
  // стейт с отфильтрованными сохраненными карточками только по ключевому слову.
  const [
    filteredSavedMoviesCardsOnlyBySearcyValue,
    setFilteredSavedMoviesCardsOnlyBySearcyValue,
  ] = useState([]);
  // стейт с ключевым словом поиска в форме сохраненных фильмов
  const [searchValueSavedMovies, setSearchValueSavedMovies] = useState("");
  // стейт чекбокса короткомертажных сохнаненных фильмов.
  const [shortSavedMoviesCheckbox, setShortSavedMoviesCheckbox] =
    useState(false);

  useEffect(() => {
    // checkValidityToken();
    getSavedMoviesCardsFromAPI();

    const shortMovieCheckbox = localStorage.getItem("shortMovieCheckbox");
    setShortMovieCheckbox(shortMovieCheckbox === "true" ? true : false);
    const shortSavedMoviesCheckbox = localStorage.getItem(
      "shortSavedMoviesCheckbox"
    );
    setShortSavedMoviesCheckbox(
      shortSavedMoviesCheckbox === "true" ? true : false
    );

    const searchValue = getSearchValueMoviesFromLocalStorage();
    searchValue && onSearchMovies(searchValue);

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
      // при удалении карточки на стр Фильмы, и переходе на стр Сохр фильмы для обновления результата стейта фильтра с сохраненными карточками.
      onSearchSavedMovies(
        searchValueSavedMovies ||
          getSearchValueSavedMoviesFromLocalStorage() ||
          ""
      );
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
    // setSearchValueSavedMovies("");
    // setSearchValueMovies("");
  }, [location]);

  function getSearchValueMoviesFromLocalStorage() {
    return localStorage.getItem("searchValueMovies");
  }

  function getSearchValueSavedMoviesFromLocalStorage() {
    return localStorage.getItem("searchValueSavedMovies");
  }

  // фильтр карточек по введенному ключевому слову в форму поиска и отмеченным флажкам.
  // заложена масштабируемость, для возможности фильтрации по нескольким чекбоксам.
  function filterMoviesCards({ cards, search, checkbox }) {
    console.log("фильтр");
    const filteredMoviesCardsOnlyBySearcyValue = [];
    const filteredMoviesCards = cards.filter((card) => {
      const matchBySearchValue = search
        ? findMatchMovieName([card.nameRU, card.nameEN])
        : true;
      search &&
        matchBySearchValue &&
        filteredMoviesCardsOnlyBySearcyValue.push(card);
      // передать массив с именами фильмов в функцию для поиска совпадения по имени.
      return (
        matchBySearchValue &&
        // если совпадение есть, передать картчоку в функцию проверки совпадений согласно установленным флажкам
        findMatchCheckboxes(card)
      );
    });

    // функция проверки совпадения по имени
    function findMatchMovieName(arrayWithCardNameS) {
      // если не задано ключевое слово, не ищем по нему, ищем по оставшимся фильтрам
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

    // функция проверки совпадения по длительности
    function findMatchMovieShort(duration) {
      // если продолжительности есть и она меньше или равна 40 минутам, вернуть true, иначе false.
      return duration && duration <= 40;
    }
    //     searchValue && setFilteredMoviesCardsOnlyBySearcyValue(filteredMoviesCardsOnlyBySearcyValue)
    // return filteredMoviesCards;
    return {
      resultFiltered: filteredMoviesCards,
      resultFilteredOnlyBySearcyValue: filteredMoviesCardsOnlyBySearcyValue,
    };
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
    !resultFiltered.length && setSearchMessage("Ничего не найдено");
    setPreloaderVisible(false);
  }

  // получить карточки фильмов из localStorage и записать в стейт
  function getMoviesCardsFromLocalStorage() {
    const movies = localStorage.getItem("movies");
    if (movies) {
      const moviesInObjectFormat = JSON.parse(movies);
      setMoviesCards(moviesInObjectFormat);
      return moviesInObjectFormat;
    }
  }

  // получить карточки сохраненных фильмов через запрос к API
  function getSavedMoviesCardsFromAPI() {}

  function onSearchMovies(searchValue) {
    setPreloaderVisible(true);
    setSearchValueMovies(searchValue);
    localStorage.setItem("searchValueMovies", searchValue);
    setSearchMessage("");
    if (!moviesCards.length) {
      const moviesCards = getMoviesCardsFromLocalStorage();
      if (moviesCards) {
        handleFilterMoviesCards({
          cards: moviesCards,
          search: searchValue,
          checkbox: shortMovieCheckbox,
        });
      } else {
        api
          .getMovieCards()
          .then((data) => {
            localStorage.setItem("movies", JSON.stringify(data));
            setMoviesCards(data);
            handleFilterMoviesCards({
              cards: data,
              search: searchValue,
              checkbox: shortMovieCheckbox,
            });
          })
          .catch((err) => {
            setErrorMessagePopupText(`${err}`);
            setErrorMessagePopupVisible(true);
            setPreloaderVisible(false);
            setSearchMessage(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
          });
      }
    } else {
      handleFilterMoviesCards({
        cards: moviesCards,
        search: searchValue,
        checkbox: shortMovieCheckbox,
      });
    }
  }

  function onSearchSavedMovies(searchValue) {
    // если поисковое слово равно предыдущему поисковому слову и нет ошибок, не делать фильтрацию и выйти, т.к. результат будет тем же.
    // if (searchValueSavedMovies === searchValue && !searchMessageSavedMovies) return;
    setPreloaderVisible(true);
    setSearchValueSavedMovies(searchValue);
    localStorage.setItem("searchValueSavedMovies", searchValue);
    setSearchMessageSavedMovies("");
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
    // !resultFiltered.length && setSearchMessageSavedMovies("Ничего не найдено")
    setPreloaderVisible(false);
  }

  function handleMovieCheckbox() {
    cardMovieDelete
      ? setShortSavedMoviesCheckbox(!shortSavedMoviesCheckbox)
      : setShortMovieCheckbox(!shortMovieCheckbox);
  }

  useEffect(() => {
    localStorage.setItem("shortMovieCheckbox", shortMovieCheckbox);
    if (shortMovieCheckbox && filteredMoviesCards.length) {
      const { resultFiltered } = filterMoviesCards({
        cards: filteredMoviesCards,
        checkbox: shortMovieCheckbox,
      });
      setFilteredMoviesCards(resultFiltered);
      !resultFiltered.length && setSearchMessage("Ничего не найдено");
    } else {
      setSearchMessage("");
      // если в отфильтрованных только по слову ничего нет, тогда не обновляем стейт отфильтрованных карточек
      filteredMoviesCardsOnlyBySearcyValue.length &&
        setFilteredMoviesCards(filteredMoviesCardsOnlyBySearcyValue);
    }
  }, [shortMovieCheckbox]);

  useEffect(() => {
    localStorage.setItem("shortSavedMoviesCheckbox", shortSavedMoviesCheckbox);
    if (shortSavedMoviesCheckbox && filteredSavedMoviesCards.length) {
      const { resultFiltered } = filterMoviesCards({
        cards: filteredSavedMoviesCards,
        checkbox: shortSavedMoviesCheckbox,
      });
      setFilteredSavedMoviesCards(resultFiltered);
      // !resultFiltered.length && setSearchMessageSavedMovies("Ничего не найдено")
    } else {
      // setSearchMessageSavedMovies("")
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
      // !resultFiltered.length && setSearchMessageSavedMovies("Ничего не найдено")
    }
  }, [shortSavedMoviesCheckbox]);

  useEffect(() => {
    // если отфильтрованных сохраненных карточек нет и есть слово в фомре поиска
    if (!filteredSavedMoviesCards.length && searchValueSavedMovies) {
      setSearchMessageSavedMovies("Ничего не найдено");
      // иначе, если отфильтрованные сохраненные карточки есть
    } else if (filteredSavedMoviesCards.length) {
      setSearchMessageSavedMovies("");
      // иначе, если нет отфильтрованных сохраненных карточек и отмечен чекбокс сохраненных фильмов и есть сохраненные карточки
    } else if (
      !filteredSavedMoviesCards.length &&
      shortSavedMoviesCheckbox &&
      savedMoviesCards.length
    ) {
      setSearchMessageSavedMovies("Ничего не найдено");
      // сделано, чтобы была возможность фильтровать карточки нажатием на чекбокс.
      // т.к. при первом переходе на страницу, сразу отображаются все сохраненные карточк, а слово поиска не введено, и первое условие не сработает.
    }
  }, [filteredSavedMoviesCards]);

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

  function handleCardLike(card) {
    setSavedMoviesCards([...savedMoviesCards, card]);
  }

  function handleCardDelete(card) {
    setSavedMoviesCards((state) => state.filter((c) => c.id !== card.id));
    setFilteredSavedMoviesCards((state) =>
      state.filter((c) => c.id !== card.id)
    );
    setFilteredSavedMoviesCardsOnlyBySearcyValue((state) =>
      state.filter((c) => c.id !== card.id)
    );
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
              moviesCards={filteredMoviesCards}
              // handleSearchValue={handleSearchValue}
              onSearchMovies={onSearchMovies}
              searchMessage={searchMessage}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              savedMoviesCards={savedMoviesCards}
              previousValueSearchForm={searchValueMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              checkboxOn={shortSavedMoviesCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              cardMovieDelete={cardMovieDelete}
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
              searchMessageSavedMovies={searchMessageSavedMovies}
              previousValueSearchForm={searchValueSavedMovies}
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
