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

export { DEFAULT_VALUES_API_DATA, API };
