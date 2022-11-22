import {createElement} from '../render.js';

const createContentBlockTemplate = () => `<section class="films"></section>`;

  export default class ContentBlockView {
    #element = null;

    get template() {
      return createContentBlockTemplate();
    }

    get element() {
      if (!this.#element) {
        this.#element = createElement(this.template);
      }

      return this.#element;
    }

    removeElement() {
      this.#element = null;
    }
  }
