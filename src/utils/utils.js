export function convertMinutesToHours(duration) {
  const hours = (duration / 60).toFixed();
  const minutes = duration % 60;
  return `${+hours ? `${hours}ч ` : ""}${+minutes ? `${minutes}м` : ""}`;
}
