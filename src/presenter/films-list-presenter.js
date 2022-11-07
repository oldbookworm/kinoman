import ContentBlockView from '../view/content-block-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import {render} from '../render.js';

export default class FilmsListPresenter {
 contentBlockComponent = new ContentBlockView();
 filmsListComponent = new FilmsListView();
 filmsListContainerComponent = new FilmsListContainerView();
 showMoreBtnComponent = new ShowMoreBtnView();

 init = (container) => {
  this.container = container;

  render(this.contentBlockComponent, this.container);
  render(this.filmsListComponent, this.contentBlockComponent.getElement());
  render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

  for(let i = 0; i < 5; i++){
    render(new FilmCardView(), this.filmsListContainerComponent.getElement());
  }

  render(this.showMoreBtnComponent, this.filmsListComponent.getElement());

 };

}
