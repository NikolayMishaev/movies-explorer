import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false);
  const [headerStyleMain, setHeaderStyleMain] = useState(true);
  const [cardMovieDelete, setCardMovieDelete] = useState(false);
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
  }, [location]);

  function handleMovieCheckbox() {
    setShortMovieCheckbox(!shortMovieCheckbox);
  }

  return (
    <div className="page page_align_center">
      <Header headerStyleMain={headerStyleMain} loggedIn={loggedIn} />
      <main className="content">
        <Switch>
        <Route exact path="/">
        <Main/>
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
      <Footer />
    </div>
  );
}

export default App;
