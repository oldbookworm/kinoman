import SortView from '../view/sort-view';
import ContentBlockView from '../view/content-block-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmPopupView from '../view/popup/film-popup-view';
import NoFilmsView from '../view/no-films-view';
import {render} from '../framework/render.js';

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
 #popupComponent = null;
 #sortedComments = null;

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
  this.#filmComments = this.#findComments(film);

  const filmCardComponent = new FilmCardView(film, this.#filmComments);

  filmCardComponent.setCardClickHandler(() => {
    this.#renderPopup(film);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#removeOnEsc);
  });

  render(filmCardComponent, this.#filmsListContainerComponent.element);
};

#renderPopup = (film) => {
  this.#filmComments = this.#findComments(film);
  this.#popupComponent = new FilmPopupView(film, this.#filmComments);

  render(this.#popupComponent, this.#container.parentElement);

  this.#popupComponent.setCloseBtnClickHandler(() => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#removeOnEsc);
  });
}


#findComments = (film) => {
  this.#sortedComments = [...this.#comments].filter((comment) => {
    return film.id === comment.id;
  });
  return this.#sortedComments;
}

#removePopup = () => {
  this.#popupComponent.element.remove();
  this.#popupComponent = null;
  document.body.classList.remove('hide-overflow');
};

#removeOnEsc = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    this.#removePopup();
    document.removeEventListener('keydown', this.#removeOnEsc);
  }
};

}
