import {createElement} from '../../render.js';

const createPopupContainerTemplate = () => `<section class="film-details"></section>`;

  export default class PopupContainerView {
    getTemplate() {
      return createPopupContainerTemplate();
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