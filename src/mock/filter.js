const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const filter = {
  [FilterType.ALL]: (films) => [...films],
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};


export const generateFilter = (films) => Object.entries(filter).map(
  ([filterName, filterFilms]) => ({
    name: filterName,
    count: filterFilms(films).length,
  }),
);
