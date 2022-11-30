import AbstractView from '../framework/view/abstract-view.js';


const createContentBlockTemplate = () => `<section class="films"></section>`;

export default class ContentBlockView extends AbstractView {
    get template() {
      return createContentBlockTemplate();
    }
}
