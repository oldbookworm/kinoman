import AbstractView from '../framework/view/abstract-view.js';
import {convertTiming} from '../util/util.js';


const createfilmCardTemplate = (filmInfo, comments) => {

  const {filmInfo: {title, totalRating, poster, release: { releaseDate}, runtime, genre, description}, userDetails: {watchlist, alreadyWatched, favorite}} = filmInfo;

  const commentsNumber = comments.length;

  const duration = convertTiming(runtime);

  return (
  `<article class="film-card">
    <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${commentsNumber} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist
    ${(watchlist) ? 'film-card__controls-item--active' : ''}"
    type="button">Add to watchlist</button>

    <button class="film-card__controls-item film-card__controls-item--mark-as-watched
    ${(alreadyWatched) ? 'film-card__controls-item--active' : ''}"
    type="button">Mark as watched</button>

    <button class="film-card__controls-item film-card__controls-item--favorite
    ${(favorite) ? 'film-card__controls-item--active' : ''}"
    type="button">Mark as favorite</button>

  </div>
  </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createfilmCardTemplate(this.#film, this.#comments);
  }

  setCardClickHandler = (callback) => {
    this._callback.cardClick = callback;
    this.element.querySelector('a').addEventListener('click', this.#cardClickHandler);
  };

 #cardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cardClick();
  };

  setWatchlistBtnClickHandler = (callback) => {
    this._callback.watchlistBtnClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistBtnClickHandler);
  };

 #watchlistBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistBtnClick();
 };

 setWatchedBtnClickHandler = (callback) => {
  this._callback.watchedBtnClick = callback;
  this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedBtnClickHandler);
};

#watchedBtnClickHandler = (evt) => {
  evt.preventDefault();
  this._callback.watchedBtnClick();
};

setFavoriteBtnClickHandler = (callback) => {
  this._callback.favoriteBtnClick = callback;
  this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteBtnClickHandler);
}

#favoriteBtnClickHandler = (evt) => {
  evt.preventDefault();
  this._callback.favoriteBtnClick();
};

}



