const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

export function toPersian(date) {
  return new Date(date).toLocaleDateString("fa-IR", options).replace('،‏', '-');
}
