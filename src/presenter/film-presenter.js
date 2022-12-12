
import FilmCardView from '../view/film-card-view';
import PopupPresenter from './popup-presenter';
import {render} from '../framework/render.js';
import { findComments } from '../util/util';


export default class FilmPresenter {
    #container = null;
    #film = null;

    #comments = [];
    #filmComments = [];


  constructor(container, comments) {
        this.#container = container;
        this.#comments = comments;
    }

  init = (film) => {
    this.#film = film;
    this.#renderFilm(this.#film);
};

#renderFilm = (film) => {
    this.#filmComments = findComments(film, this.#comments);

    const filmCardComponent = new FilmCardView(film, this.#filmComments);
    console.log(filmCardComponent);

    filmCardComponent.setCardClickHandler(() => {
      const popupPresenter = new PopupPresenter(this.#container.parentElement);
      popupPresenter.init(film, this.#comments);
      document.body.classList.add('hide-overflow');
    });

    render(filmCardComponent, this.#container);
  };

}
