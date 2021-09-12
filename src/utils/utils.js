import {
  DURATION_SHORT_MOVIE,
  BREAKPOINTS,
  BASIC_NUMBER_CARDS,
  NUMBER_CARDS_IN_ROW,
} from "./constants";

// функция конвертации продолжительности из минут в часы
export function convertMinutesToHours(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${+hours ? `${hours}ч ` : ""}${+minutes ? `${minutes}м` : ""}`;
}

// функция рассчета количества карточек в зависимости от текущей ширины окна для базового случая, когда произошел сабмит формы поиска
// и для случая, когда была нажата кнопка добавления карточек "Еще"
export function calculateNumberMoviesCards(onButtonAddMoreCards) {
  const currentWindowWidth = window.innerWidth;
  if (currentWindowWidth <= BREAKPOINTS.mobile)
    return onButtonAddMoreCards
      ? NUMBER_CARDS_IN_ROW.mobile
      : BASIC_NUMBER_CARDS.mobile;
  if (currentWindowWidth <= BREAKPOINTS.tablet)
    return onButtonAddMoreCards
      ? NUMBER_CARDS_IN_ROW.tablet
      : BASIC_NUMBER_CARDS.tablet;
  if (currentWindowWidth <= BREAKPOINTS.laptop)
    return onButtonAddMoreCards
      ? NUMBER_CARDS_IN_ROW.laptop
      : BASIC_NUMBER_CARDS.laptop;
  return onButtonAddMoreCards
    ? NUMBER_CARDS_IN_ROW.desktop
    : BASIC_NUMBER_CARDS.desktop;
}

// функция получения необходимомо количества карточек, для выравнивания в последнем ряду.
export function getNumberCardsForAlignLastRow(
  cards,
  currentNumberCards,
  iteration = 1
) {
  const summ = currentNumberCards + iteration;
  return summ % cards === 0
    ? summ
    : getNumberCardsForAlignLastRow(cards, currentNumberCards, ++iteration);
}

// фильтр карточек по введенному ключевому слову в форму поиска и отмеченным флажкам.
// заложена масштабируемость, для возможности фильтрации по нескольким чекбоксам.
export function filterMoviesCards({ cards, search, checkboxes }) {
  const filteredMoviesCardsOnlyBySearcyValue = [];
  const filteredMoviesCards = cards.filter((card) => {
    // если не задано ключевое слово, не ищем по нему, ищем по оставшимся фильтрам.
    const matchBySearchValue = search
      ? // передать массив с именами фильмов в функцию для поиска совпадения по ключевому слову.
        findMatchSearchValueCheckboxes(card)
      : true;
    search &&
      matchBySearchValue &&
      filteredMoviesCardsOnlyBySearcyValue.push(card);
    return (
      // если совпадение по ключевому слову есть, передать картчоку в функцию проверки совпадений согласно установленным чекбоксам сортировки.
      matchBySearchValue && findMatchSortingCheckboxes(card)
    );
  });

  function findMatchSearchValueCheckboxes(card) {
    if (checkboxes.year && !findMatchSearchValue(card.year)) return false;
    if (checkboxes.country && !findMatchSearchValue(card.country)) return false;
    if (checkboxes.director && !findMatchSearchValue(card.director))
      return false;
    if (checkboxes.description && !findMatchSearchValue(card.description))
      return false;
    if (
      checkboxes.name &&
      !findMatchSearchValue(
        checkboxes.lang === "RU"
          ? (checkRuLetters(card.nameRU) && card.nameRU) ||
              (checkRuLetters(card.nameEN) && card.nameEN)
          : !checkRuLetters(card.nameEN) && card.nameEN
      )
    ) {
      return false;
    }
    return true;
  }

  function checkRuLetters(cardName) {
    return /[а-яА-Яё]/g.test(cardName);
  }

  function findMatchSortingCheckboxes(card) {
    if (checkboxes.short && !findMatchMovieShort(card.duration)) {
      // если хотя бы один из чекбоксов не прошел проверку вернуть false.
      return false;
    }
    // если все проверки (для каждого чекбокса) прошли успешно, вернуть true.
    return true;
  }

  function findMatchSearchValue(value) {
    return value && value.toLowerCase().includes(search);
  }

  function findMatchMovieShort(duration) {
    return duration && duration <= DURATION_SHORT_MOVIE;
  }
  checkboxes.alphabet &&
    sortAlphabetically(filteredMoviesCards, checkboxes.lang);
  checkboxes.alphabet &&
    sortAlphabetically(filteredMoviesCardsOnlyBySearcyValue, checkboxes.lang);
  return {
    resultFiltered: filteredMoviesCards,
    resultFilteredOnlyBySearcyValue: filteredMoviesCardsOnlyBySearcyValue,
  };
}

// проверить, что отмечен минимум один чекбокс группы.
export function calculateNumberEnabledCheckboxes(arrayCheckboxes) {
  return arrayCheckboxes.reduce((p, i) => (i ? p + i : p), 0);
}

export function sortAlphabetically(cards, lang) {
  return lang === "RU"
    ? cards.sort((a, b) => {
        a.nameRU = a.nameRU || a.nameEN;
        b.nameRU = b.nameRU || b.nameEN;
        if (!a.nameEN) return -1;
        if (!b.nameEN) return 1;
        return a.nameRU.toLowerCase().trim() < b.nameRU.toLowerCase().trim()
          ? -1
          : 1;
      })
    : cards.sort((a, b) => {
        a.nameEN = a.nameEN || a.nameRU;
        b.nameEN = b.nameEN || b.nameRU;
        if (!a.nameEN) return -1;
        if (!b.nameEN) return 1;
        return a.nameEN.toLowerCase().trim() < b.nameEN.toLowerCase().trim()
          ? -1
          : 1;
      });
}

export function checkValidityUrl(URL) {
  return /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.+.[a-zA-Z]{2,4}/gi.test(URL);
}
