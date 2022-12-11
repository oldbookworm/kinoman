import SortView from '../view/sort-view';
import ContentBlockView from '../view/content-block-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import NoFilmsView from '../view/no-films-view';
import PopupPresenter from './popup-presenter';
import {render} from '../framework/render.js';
import { findComments } from '../util/util';

const CARDS_COUNT_PER_STEP = 5;


export default class FilmsPresenter {
 #sortComponent = new SortView();
 #contentBlockComponent = new ContentBlockView();
 #filmsListComponent = new FilmsListView();
 #filmsListContainerComponent = new FilmsListContainerView();
 #showMoreBtnComponent = new ShowMoreBtnView();
 #noFilmsComponent = new NoFilmsView();

 #container = null;
 #filmsModel = null;
 #commentsModel = null;


 #films = [];
 #comments = [];
 #filmComments = [];


 #renderedFilmsCount = CARDS_COUNT_PER_STEP;

 constructor(container, filmsModel, commentsModel) {
  this.#container = container;
  this.#filmsModel = filmsModel;
  this.#commentsModel = commentsModel;
}

init = () => {
  this.#films = [...this.#filmsModel.films];
  this.#comments = [...this.#commentsModel.comments];

  this.#renderMainFilmsContent();
};

#renderMainFilmsContent = () => {
  this.#renderSort();
  this.#renderFilmsContainer();
  this.#renderFilmCards();
}

#renderSort = () => {
  render(this.#sortComponent, this.#container);
}

#renderFilmsContainer = () => {
  render(this.#contentBlockComponent, this.#container);
  render(this.#filmsListComponent, this.#contentBlockComponent.element);
  render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
}

#renderFilms = (from, to) => {
  this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
}

#renderFilmCards = () => {
  if(this.#films.length === 0) {
    this.#renderNofilms();
  } else {
    this.#renderFilms(0, Math.min(this.#films.length, CARDS_COUNT_PER_STEP));
    }
    if(this.#films.length > CARDS_COUNT_PER_STEP){
      this.#renderShowMoreBtn();
    }
  }


#renderShowMoreBtn = () => {
  render(this.#showMoreBtnComponent, this.#filmsListComponent.element);
  this.#showMoreBtnComponent.setMoreBtnClickHandler(() => this.#showMoreBtnClickHandler());
}

#renderNofilms = () => {
  render(this.#noFilmsComponent, this.#filmsListComponent.element);
}

#showMoreBtnClickHandler = () => {
    this.#renderFilms(this.#renderedFilmsCount, this.#renderedFilmsCount + CARDS_COUNT_PER_STEP);

    this.#renderedFilmsCount += CARDS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreBtnComponent);
    }
  };


#renderFilm = (film) => {
  this.#filmComments = findComments(film, this.#comments);

  const filmCardComponent = new FilmCardView(film, this.#filmComments);

  filmCardComponent.setCardClickHandler(() => {
    const popupPresenter = new PopupPresenter(this.#container.parentElement);
    popupPresenter.init(film, this.#comments);
    document.body.classList.add('hide-overflow');
  });

  render(filmCardComponent, this.#filmsListContainerComponent.element);
};

}
