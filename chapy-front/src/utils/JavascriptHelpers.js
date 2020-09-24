export function objectValues(obj) {
  return Object.keys(obj).map(function (e) {
    return obj[e];
  });
}
