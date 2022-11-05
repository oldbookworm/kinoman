import {createElement} from '../render.js';

const createContentBlockTemplate = () => `<section class="films"></section>`;

  export default class ContentBlockView {
    getTemplate() {
      return createContentBlockTemplate();
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
