import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = (filmsCount) => (
  `<section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>`
  );

export default class StatisticsView extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createStatisticsTemplate(this.#count);
  }
}
