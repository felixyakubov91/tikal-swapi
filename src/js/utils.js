function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function sortByProperty(items, property) {
  return items.sort((a, b) => (a[property] < b[property] ? 1 : -1));
}

export { numberWithCommas, sortByProperty };
