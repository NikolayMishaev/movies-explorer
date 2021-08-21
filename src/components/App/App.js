import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page page_align_center">
      <Header loggedIn={loggedIn} />
      {/* <Main/> */}
      <Movies />
      <Footer />
    </div>
  );
}

export default App;
