function importAll(r) {
  let games = {}
  r.keys().map((item) => {
    const name = item.replace(/.json|.\//g, '')
    if (name.includes('Indo')) {
      games[name] = r(item);
    }
  });
  return games;
}

const games = importAll(require.context('.', false, /\.json/));

export default games
