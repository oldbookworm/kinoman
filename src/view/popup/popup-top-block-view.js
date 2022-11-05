import {createElement} from '../../render.js';

const createPopupTopBlockTemplate = () => `<div class="film-details__top-container"></div>`;

  export default class PopupTopBlockView {
    getTemplate() {
      return createPopupTopBlockTemplate();
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
