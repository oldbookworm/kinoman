import SortView from '../view/sort-view';
import ContentBlockView from '../view/content-block-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmPopupView from '../view/popup/film-popup-view';
import {render} from '../render.js';

export default class FilmsPresenter {
 sortComponent = new SortView();
 contentBlockComponent = new ContentBlockView();
 filmsListComponent = new FilmsListView();
 filmsListContainerComponent = new FilmsListContainerView();
 showMoreBtnComponent = new ShowMoreBtnView();

 init = (container, filmsModel, commentsModel) => {
  this.container = container;
  this.filmsModel = filmsModel;
  this.films = [...this.filmsModel.getFilms()];
  this.commentsModel = commentsModel;
  this.comments = [...this.commentsModel.getComments()];

  render(this.sortComponent, this.container);
  render(this.contentBlockComponent, this.container);
  render(this.filmsListComponent, this.contentBlockComponent.getElement());
  render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

  for(let i = 0; i < this.films.length; i++){
    this.filmComments = [...this.comments].filter((comment) => {
       return this.films[i].id === comment.id;
    });
    render(new FilmCardView(this.films[i], this.filmComments), this.filmsListContainerComponent.getElement());
  }

  render(this.showMoreBtnComponent, this.filmsListComponent.getElement());

  render(new FilmPopupView(this.films[0], this.comments.slice(0,4)), this.container.parentElement);
 };

}
