import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false);

  function handleMovieCheckbox() {
    setShortMovieCheckbox(!shortMovieCheckbox);
  }

  return (
    <div className="page page_align_center">
      <Header loggedIn={loggedIn} />
      <main className="content">
        {/* <Main/> */}
        <Movies
          checkboxOn={shortMovieCheckbox}
          handleMovieCheckbox={handleMovieCheckbox}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
