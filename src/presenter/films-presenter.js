import SortView from '../view/sort-view';
import ContentBlockView from '../view/content-block-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmPopupView from '../view/popup/film-popup-view';
import {render} from '../render.js';

const CARDS_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
 #sortComponent = new SortView();
 #contentBlockComponent = new ContentBlockView();
 #filmsListComponent = new FilmsListView();
 #filmsListContainerComponent = new FilmsListContainerView();
 #showMoreBtnComponent = new ShowMoreBtnView();

 #container = null;
 #filmsModel = null;
 #commentsModel = null;
 #popupComponent = null;

 #films = [];
 #comments = [];
 #filmComments = [];

 #renderedFilmsCount = CARDS_COUNT_PER_STEP;

init = (container, filmsModel, commentsModel) => {
  this.#container = container;
  this.#filmsModel = filmsModel;
  this.#films = [...this.#filmsModel.films];
  this.#commentsModel = commentsModel;
  this.#comments = [...this.#commentsModel.comments];

  if(this.#films.length === 0) {
    // render(new NoFilmView(), this.#container);
    alert('puk!');
  } else {
    render(this.#sortComponent, this.#container);
    render(this.#contentBlockComponent, this.#container);
    render(this.#filmsListComponent, this.#contentBlockComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for(let i = 0; i < Math.min(this.#films.length, CARDS_COUNT_PER_STEP); i++){
      this.#renderFilm(this.#films[i]);
    }

    if(this.#films.length > CARDS_COUNT_PER_STEP){
      render(this.#showMoreBtnComponent, this.#filmsListComponent.element);
      this.#showMoreBtnComponent.element.addEventListener('click', this.#handleShowMoreBtnClick);
    }
  }
}

  #handleShowMoreBtnClick = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += CARDS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreBtnComponent.element.remove();
      this.#showMoreBtnComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    this.#filmComments = [...this.#comments].filter((comment) => {
            return film.id === comment.id;
      });

    const filmCardComponent = new FilmCardView(film, this.#filmComments);

    const filmCardElement = filmCardComponent.element.querySelector('a');

    filmCardElement.addEventListener('click', (evt) => {
      this.#renderPopup(film, this.#filmComments);
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', this.#removeOnEsc);
    });

    render(filmCardComponent, this.#filmsListContainerComponent.element)

  };

#renderPopup = (film, comments) => {
  this.#popupComponent = new FilmPopupView(film, comments);
  render(this.#popupComponent, this.#container.parentElement);

  const popupCloseButton = this.#popupComponent.element.querySelector('.film-details__close-btn');

  popupCloseButton.addEventListener('click', () => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#removeOnEsc);
  });
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
