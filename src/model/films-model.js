import {generateFilms} from '../mock/mock-film';

export default class FilmsModel {
  #films = generateFilms();

  get films() {
    return this.#films;
  }
};
