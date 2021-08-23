import React, { useState, useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false);
  const [headerStyleMain, setHeaderStyleMain] = useState(true);
  const [cardMovieDelete, setCardMovieDelete] = useState(false);
  const [entryLocation, setEntryLocation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setHeaderStyleMain(false);
    } else {
      setHeaderStyleMain(true);
    }
    if (location.pathname === "/saved-movies") {
      setCardMovieDelete(true);
    } else {
      setCardMovieDelete(false);
    }
    if (
      location.pathname === "/sign-up" ||
      location.pathname === "/sign-in" ||
      location.pathname === "/profile"
    ) {
      setEntryLocation(true);
    } else {
      setEntryLocation(false);
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
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </main>
      <Footer entryLocation={entryLocation} />
    </div>
  );
}

export default App;
