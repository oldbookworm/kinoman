import AbstractView from '../../framework/view/abstract-view.js';
import {createFilmPopupInfoTemplate} from './film-popup-info-template.js';
import {createFilmPopupCommentsTemplate} from './film-popup-comments-template.js';
import {createFilmPopupFormTemplate} from './film-popup-form-template.js';
import {createFilmPopupControlsTemplate} from './film-popup-controls-template.js';

const createFilmPopupTemplate = (popupInfo, popupComments) => {

  const commentsCount = popupComments.length;

  return (
  `<section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmPopupInfoTemplate(popupInfo)}

          ${createFilmPopupControlsTemplate()}

        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            ${createFilmPopupCommentsTemplate(popupComments)}

            ${createFilmPopupFormTemplate()}

          </section>
        </div>
      </div>
    </section>
  `);
}
export default class FilmPopupView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmPopupTemplate(this.#film, this.#comments);
  }

  setCloseBtnClickHandler = (callback) => {
      this._callback.closeBtnClick = callback;
      this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

   #closeBtnClickHandler = (evt) => {
      evt.preventDefault();
      this._callback.closeBtnClick();
  };

}
