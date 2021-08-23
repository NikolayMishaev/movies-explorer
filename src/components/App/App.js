import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // стейт для авторизации пользователя
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false); // стейт состояния чекбокса короткомертажных фильмов
  const [headerStyleMain, setHeaderStyleMain] = useState(true); // стейт для изменения фона компонента Header
  const [cardMovieDelete, setCardMovieDelete] = useState(false); // стейт кнопки лайка карточки фильма
  const [entryLocation, setEntryLocation] = useState(false); // стейт отображения компонентов Header и Footer
  const location = useLocation();

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
      onLogin(); //  регистрация пользователя, если прописать роут в адресной строке (временно)
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
    if (location.pathname === "/movies") {
      //  регистрация пользователя, если прописать роут в адресной строке (временно)
      onLogin();
    }
  }, [location]);

  function onLogin() {
    setLoggedIn(true);
  }

  function signOut() {
    setLoggedIn(false);
  }

  function handleMovieCheckbox() {
    setShortMovieCheckbox(!shortMovieCheckbox);
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
            <Profile signOut={signOut} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onLogin={onLogin} />
          </Route>
          <Route path="/movies">
            <Movies
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              checkboxOn={shortMovieCheckbox}
              handleMovieCheckbox={handleMovieCheckbox}
              cardMovieDelete={cardMovieDelete}
            />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer entryLocation={entryLocation} />
    </div>
  );
}

export default App;
