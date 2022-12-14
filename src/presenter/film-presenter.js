
import FilmCardView from '../view/film-card-view';
import PopupPresenter from './popup-presenter';
import {render, replace, remove} from '../framework/render.js';
import { findComments } from '../util/util';


export default class FilmPresenter {
    #container = null;
    #film = null;
    #filmCardComponent = null;
    #changeData = null;
    #popupPresenter = null;

    #comments = [];
    #filmComments = [];


  constructor(container, comments, changeData) {
        this.#container = container;
        this.#comments = comments;
        this.#changeData = changeData;
    }

  init = (film) => {

    this.#film = film;

    this.#filmComments = findComments(film, this.#comments);

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film, this.#filmComments);

    this.#filmCardComponent.setCardClickHandler(() => {
      this.#renderPopup(this.#film, this.#filmComments);
    });

    this.#filmCardComponent.setWatchlistBtnClickHandler(this.#watchlistBtnClickHandler);
    this.#filmCardComponent.setWatchedBtnClickHandler(this.#watchedBtnClickHandler);
    this.#filmCardComponent.setFavoriteBtnClickHandler(this.#favoriteBtnClickHandler);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#container);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);
    remove(prevFilmCardComponent);

};

#renderPopup = (film, comments) => {
  if(!this.#popupPresenter) {
    this.#popupPresenter = new PopupPresenter(this.#container.parentElement, this.#changeData);
  }
   this.#popupPresenter.init(film, comments);
   document.body.classList.add('hide-overflow');
}

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      },
    });
  };

  #watchedBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    });
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      }
    });
  };

}

