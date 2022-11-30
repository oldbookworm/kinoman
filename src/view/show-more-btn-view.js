import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreBtnTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreBtnView extends AbstractView {
  get template() {
    return createShowMoreBtnTemplate();
  }

  setMoreBtnClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.addEventListener('click', this.#moreBtnClickHandler);
  };

  #moreBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonClick();
  };

}
