import {createElement} from '../../render.js';

const createPopupBottomBlockTemplate = () => `<div class="film-details__bottom-container"></div>`;

  export default class PopupBottomBlockView {
    getTemplate() {
      return createPopupBottomBlockTemplate();
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
