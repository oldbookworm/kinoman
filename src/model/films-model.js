import {generateFilms} from '../mock/mock-film';

export default class FilmsModel {
  films = generateFilms();

  getFilms = () => this.films;
};
