export function sortArryByDate(arr) {
  return arr.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}
