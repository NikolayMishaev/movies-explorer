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
  if (currentWindowWidth <= 629) return onButtonAddMoreCards ? 1 : 5;
  if (currentWindowWidth <= 989) return onButtonAddMoreCards ? 2 : 8;
  if (currentWindowWidth <= 1279) return onButtonAddMoreCards ? 3 : 12;
  return onButtonAddMoreCards ? 4 : 16;
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
