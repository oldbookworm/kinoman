import FilmPopupView from '../view/popup/film-popup-view';
import {render, replace, remove} from '../framework/render.js';
import { findComments } from '../util/util';

export default class PopupPresenter {
    #popupComponent = null;
    #popupContainer = null;
    #film = null;
    #comments = null;
    #filmComments = null;
    #changeData = null;


    constructor(popupContainer, changeData) {
        this.#popupContainer = popupContainer;
        this.#changeData = changeData;
    }



    init = (film, comments) => {
        this.#film = film;
        this.#comments = comments;

        this.#filmComments = findComments(this.#film, this.#comments);

        const prevPopupComponent = this.#popupComponent;

        this.#popupComponent = new FilmPopupView(this.#film, this.#filmComments);

        document.addEventListener('keydown', this.#removeOnEsc);

        this.#popupComponent.setCloseBtnClickHandler(() => {
            this.#removePopup();
            document.removeEventListener('keydown', this.#removeOnEsc);
        });

        this.#popupComponent.setWatchlistBtnClickHandler(this.#watchlistBtnClickHandler);
        this.#popupComponent.setWatchedBtnClickHandler(this.#watchedBtnClickHandler);
        this.#popupComponent.setFavoriteBtnClickHandler(this.#favoriteBtnClickHandler);

        if(prevPopupComponent === null) {
            render(this.#popupComponent, this.#popupContainer);
            return;
        }

        replace(this.#popupComponent, prevPopupComponent);
        remove(prevPopupComponent);

    }

    destroy = () => {
        remove(this.#popupComponent);
    };

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
