export function getAllSavedValuesFromLocalStorage() {
  const searchValueMovies = getSearchValueMoviesFromLocalStorage();
  const searchValueSavedMovies = getSearchValueSavedMoviesFromLocalStorage();
  const moviesCheckboxes = getMoviesCheckboxesFromLocalStorage();
  const savedMoviesCheckboxes = getSavedMoviesCheckboxexFromLocalStorage();
  const moviesCards = getMoviesCardsFromLocalStorage();
  const totalNumberMoviesCards = getTotalNumberMoviesCardsFromLocalStorage();
  return {
    searchValueMovies,
    searchValueSavedMovies,
    moviesCheckboxes,
    savedMoviesCheckboxes,
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
    alphabet: localStorage.getItem("alphabetMoviesCheckbox") === "true",
    multi: localStorage.getItem("multiMoviesCheckbox") === "true",
    lang: localStorage.getItem("langMoviesCards"),
  };
  return checkboxes;
}

function getSavedMoviesCheckboxexFromLocalStorage() {
  const checkboxes = {
    name: localStorage.getItem("nameSavedMoviesCheckbox") === "true",
    year: localStorage.getItem("yearSavedMoviesCheckbox") === "true",
    country: localStorage.getItem("countrySavedMoviesCheckbox") === "true",
    director: localStorage.getItem("directorSavedMoviesCheckbox") === "true",
    description:
      localStorage.getItem("descriptionSavedMoviesCheckbox") === "true",
    short: localStorage.getItem("shortSavedMoviesCheckbox") === "true",
    alphabet: localStorage.getItem("alphabetSavedMoviesCheckbox") === "true",
    multi: localStorage.getItem("multiSavedMoviesCheckbox") === "true",
    lang: localStorage.getItem("langSavedMoviesCards"),
  };
  return checkboxes;
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

export function removeItemsFromLocalStorage() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("moviesCards");
  localStorage.removeItem("searchValueMovies");
  localStorage.removeItem("searchValueSavedMovies");
  localStorage.removeItem("totalNumberMoviesCards");
  removeMoviesCheckboxes();
  removeSavedMoviesCheckboxes();
}

export function removeMoviesCheckboxes() {
  localStorage.removeItem("nameMoviesCheckbox");
  localStorage.removeItem("yearMoviesCheckbox");
  localStorage.removeItem("countryMoviesCheckbox");
  localStorage.removeItem("directorMoviesCheckbox");
  localStorage.removeItem("descriptionMoviesCheckbox");
  localStorage.removeItem("shortMoviesCheckbox");
  localStorage.removeItem("alphabetMoviesCheckbox");
  localStorage.removeItem("multiMoviesCheckbox");
  localStorage.removeItem("langMoviesCards");
}

export function removeSavedMoviesCheckboxes() {
  localStorage.removeItem("nameSavedMoviesCheckbox");
  localStorage.removeItem("yearSavedMoviesCheckbox");
  localStorage.removeItem("countrySavedMoviesCheckbox");
  localStorage.removeItem("directorSavedMoviesCheckbox");
  localStorage.removeItem("descriptionSavedMoviesCheckbox");
  localStorage.removeItem("shortSavedMoviesCheckbox");
  localStorage.removeItem("alphabetSavedMoviesCheckbox");
  localStorage.removeItem("multiSavedMoviesCheckbox");
  localStorage.removeItem("langSavedMoviesCards");
}
