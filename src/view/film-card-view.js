import {createElement} from '../render.js';

const createfilmCardTemplate = () => (
  `<article class="film-card">
    <a class="film-card__link">
    <h3 class="film-card__title"></h3>
    <p class="film-card__rating"></p>
    <p class="film-card__info">
      <span class="film-card__year"></span>
      <span class="film-card__duration"></span>
      <span class="film-card__genre"></span>
    </p>
    <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
    <p class="film-card__description"></p>
    <span class="film-card__comments"></span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
  </article>`
  );

  export default class FilmCardView {
    getTemplate() {
      return createfilmCardTemplate();
    }

    getElement() {
      if (!this.element) {
        this.element = createElement(this.getTemplate());
      }

      return this.element;
    }

    removeElement() {
      this.element = null;
    }
  }
