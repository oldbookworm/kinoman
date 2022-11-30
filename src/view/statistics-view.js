import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = () => (
  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );

export default class StatisticsView extends AbstractView {
  get template() {
    return createStatisticsTemplate();
  }
}
