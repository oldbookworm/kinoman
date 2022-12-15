import SortView from '../view/sort-view';
import ContentBlockView from '../view/content-block-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import NoFilmsView from '../view/no-films-view';
import {render} from '../framework/render.js';
import { updateItem } from '../util/util';
import FilmPresenter from './film-presenter';
import PopupPresenter from './popup-presenter';

const CARDS_COUNT_PER_STEP = 5;


export default class MainPresenter {

 #sortComponent = new SortView();
 #contentBlockComponent = new ContentBlockView();
 #filmsListComponent = new FilmsListView();
 #filmsListContainerComponent = new FilmsListContainerView();
 #showMoreBtnComponent = new ShowMoreBtnView();
 #noFilmsComponent = new NoFilmsView();

 #container = null;
 #filmsModel = null;
 #commentsModel = null;
 #popupPresenter = null;

 #selectedFilm = null;


 #films = [];
 #comments = [];

 #filmPresenter = new Map();

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

#changeFilmHandler = (updatedFilm) => {
  this.#films = updateItem(this.#films, updatedFilm);
  this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

  if(this.#popupPresenter && this.#selectedFilm.id === updatedFilm.id) {
    this.#selectedFilm = updatedFilm;
    this.#renderPopup();
  }
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
  const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#comments, this.#changeFilmHandler, this.#addPopupComponent);
   filmPresenter.init(film);
   this.#filmPresenter.set(film.id, filmPresenter);
};

#addPopupComponent = (film) => {
  if(this.#selectedFilm && this.#selectedFilm.id === film.id) {
    return;
  }
  if(this.#selectedFilm && this.selectedFilm.id !== film.id) {
    this.#removePopup();
  }

  this.#selectedFilm = film;
  this.#renderPopup();
  document.body.classList.add('hide-overflow');
};

#renderPopup = () => {
  if(!this.#popupPresenter) {
    this.#popupPresenter = new PopupPresenter(this.#container.parentElement, this.#changeFilmHandler, this.#removePopup);
  }
  this.#popupPresenter.init(this.#selectedFilm, this.#comments);
};

#removePopup = () => {
  this.#popupPresenter.destroy();
  this.#popupPresenter = null;
  this.#selectedFilm = null;
  document.body.classList.remove('hide-overflow');
};

#clearFilmsList = () => {
  this.#filmPresenter.forEach((presenter) => presenter.destroy());
  this.#filmPresenter.clear();
  this.#renderedFilmsCount = TASK_COUNT_PER_STEP;
  remove(this.#showMoreBtnComponent);
};

}
