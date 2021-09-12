const DURATION_SHORT_MOVIE = 40;

const BREAKPOINTS = {
  mobile: 629,
  tablet: 979,
  laptop: 1279,
};

const BASIC_NUMBER_CARDS = {
  mobile: 5,
  tablet: 8,
  laptop: 12,
  desktop: 16,
};

const NUMBER_CARDS_IN_ROW = {
  mobile: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
};

const DEFAULT_VALUES_API_DATA = {
  string: "данные отсутствовали в базе BeatfilmMovies",
  number: 0,
  URLForImage: `https://api.nomoreparties.conodataavailable`,
  URLForVideo: `https://www.youtube.comnodataavailable`,
};

const API = {
  moviesURL: "https://api.nomoreparties.co/beatfilm-movies",
  savedMoviesURL: "https://api.movies-star.nikolaym.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
};

export {
  DEFAULT_VALUES_API_DATA,
  API,
  DURATION_SHORT_MOVIE,
  BREAKPOINTS,
  BASIC_NUMBER_CARDS,
  NUMBER_CARDS_IN_ROW,
};
