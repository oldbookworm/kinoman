import AbstractView from '../framework/view/abstract-view.js';

const createMainNavTemplate = (filters) => {

  const getFilterCount = (filterName) => {
    let count = 0;
    filters.forEach((item) => {
      if(item.name === filterName) {
       count = item.count;
      }
    });
    return count;
  };

  return (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilterCount('watchlist')}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilterCount('history')}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilterCount('favorites')}</span></a>
  </nav>`
  );
};

export default class MainNavView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createMainNavTemplate(this.#filters);
  }
}
