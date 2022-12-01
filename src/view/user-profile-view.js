import AbstractView from '../framework/view/abstract-view.js';

const createUserProfileTemplate = (status) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );

export default class UserProfileView extends AbstractView {
  #status = null;

  constructor(status) {
    super();
    this.#status = status;
  }

  get template() {
    return createUserProfileTemplate(this.#status);
  }
}
