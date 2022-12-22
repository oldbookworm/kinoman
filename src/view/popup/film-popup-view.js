import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {createFilmPopupInfoTemplate} from './film-popup-info-template.js';
import {createFilmPopupCommentsTemplate} from './film-popup-comments-template.js';
import {createFilmPopupFormTemplate} from './film-popup-form-template.js';
import {createFilmPopupControlsTemplate} from './film-popup-controls-template.js';

const createFilmPopupTemplate = ({filmInfo, userDetails, comments, checkedEmotion, comment}) => {

  return (
  `<section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmPopupInfoTemplate(filmInfo)}

          ${createFilmPopupControlsTemplate(userDetails)}

        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            ${createFilmPopupCommentsTemplate(comments)}

            ${createFilmPopupFormTemplate(checkedEmotion, comment)}

          </section>
        </div>
      </div>
    </section>
  `);
}
export default class FilmPopupView extends AbstractStatefulView {

  constructor(film, comments) {
    super();
    this._state = FilmPopupView.parseFilmToState(film, comments);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmPopupTemplate(this._state);
  }

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  static parseFilmToState = (film, comments, checkedEmotion = null, comment, scrollPosition = 0) => ({...film, comments, checkedEmotion, comment, scrollPosition
  });


  setCloseBtnClickHandler = (callback) => {
      this._callback.closeBtnClick = callback;
      this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

   #closeBtnClickHandler = (evt) => {
      evt.preventDefault();
      this._callback.closeBtnClick();
  };

  setWatchlistBtnClickHandler = (callback) => {
    this._callback.watchlistBtnClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistBtnClickHandler);
  };

#watchlistBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistBtnClick();
 };

  setWatchedBtnClickHandler = (callback) => {
    this._callback.watchedBtnClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedBtnClickHandler);
  };

#watchedBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedBtnClick();
  };

  setFavoriteBtnClickHandler = (callback) => {
    this._callback.favoriteBtnClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteBtnClickHandler);
  };

#favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteBtnClick();
  };

#emotionClickHandler = (evt) => {
  evt.preventDefault();
  this.updateElement({
    checkedEmotion: evt.currentTarget.dataset.emotionType,
    scrollPosition: this.element.scrollTop
  });
};

#commentInputChangeHandler = (evt) => {
   evt.preventDefault();
  this._setState({comment: evt.target.value});
};

  #setInnerHandlers = () => {
    this.element
      .querySelectorAll('.film-details__emoji-label')
      .forEach((element) => {
        element.addEventListener('click', this.#emotionClickHandler);
      });
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputChangeHandler);
  };

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setWatchlistBtnClickHandler(this._callback.watchlistBtnClick);
    this.setWatchedBtnClickHandler(this._callback.watchedBtnClick);
    this.setFavoriteBtnClickHandler(this._callback.favoriteBtnClick);
  };


}
