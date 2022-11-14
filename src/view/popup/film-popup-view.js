import {createElement} from '../../render.js';
import {createFilmPopupInfoTemplate} from './film-popup-info-template.js';
import {createFilmPopupCommentsTemplate} from './film-popup-comments-template.js';
import {createFilmPopupFormTemplate} from './film-popup-form-template.js';
import {createFilmPopupControlsTemplate} from './film-popup-controls-template.js';

const createFilmPopupTemplate = () =>
  `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmPopupInfoTemplate()}

          ${createFilmPopupControlsTemplate()}

        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

            ${createFilmPopupCommentsTemplate()}

            ${createFilmPopupFormTemplate()}

          </section>
        </div>
      </div>
    </section>
  `;

export default class FilmPopupView {
  getTemplate() {
    return createFilmPopupTemplate();
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
