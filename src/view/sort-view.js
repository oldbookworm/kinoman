import AbstractView from '../framework/view/abstract-view.js';
import { sortType } from '../util/sort.js';

const createSortTemplate = (activeSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${(activeSortType === sortType.DEFAULT) ? 'sort__button--active' : ''}" data-sort-type="${sortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${(activeSortType === sortType.DATE) ? 'sort__button--active' : ''}" data-sort-type="${sortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${(activeSortType === sortType.RATING) ? 'sort__button--active' : ''}" data-sort-type="${sortType.RATING}">Sort by rating</a></li>
</ul>`
  );

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}


