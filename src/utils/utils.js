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
    if (checkboxes.name && !findMatchMovieName([card.nameRU, card.nameEN]))
      return false;
    return true;
  }

  function findMatchSortingCheckboxes(card) {
    if (checkboxes.short && !findMatchMovieShort(card.duration)) {
      // если хотя бы один из чекбоксов не прошел проверку вернуть false.
      return false;
    }
    // если все проверки (для каждого чекбокса) прошли успешно, вернуть true.
    return true;
  }

  function findMatchMovieName(arrayWithCardNameS) {
    return arrayWithCardNameS.some(
      (name) => name && name.toLowerCase().includes(search)
    );
  }

  function findMatchSearchValue(value) {
    return value && value.toLowerCase().includes(search);
  }

  function findMatchMovieShort(duration) {
    return duration && duration <= DURATION_SHORT_MOVIE;
  }

  return {
    resultFiltered: filteredMoviesCards,
    resultFilteredOnlyBySearcyValue: filteredMoviesCardsOnlyBySearcyValue,
  };
}

// проверить, что отмечен минимум один чекбокс группы.
export function checkMinimumOneEnabledSearchValueCheckboxes(checkboxes) {
  const { name, year, country, director, description } = checkboxes;
  return name || year || country || director || description;
}
