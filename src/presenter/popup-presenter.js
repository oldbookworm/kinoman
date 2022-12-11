import FilmPopupView from '../view/popup/film-popup-view';
import {render} from '../framework/render.js';
import { findComments } from '../util/util';

export default class PopupPresenter {
    #popupComponent = null;
    #popupContainer = null;
    #film = null;
    #comments = null;
    #filmComments = null;


    constructor(popupContainer) {
        this.#popupContainer = popupContainer;
    }

    init = (film, comments) => {
        this.#film = film;
        this.#comments = comments;

        this.#renderPopup(this.#film);
    }

    #renderPopup = (film) => {
        this.#filmComments = findComments(film, this.#comments);
        this.#popupComponent = new FilmPopupView(film, this.#filmComments);

        render(this.#popupComponent, this.#popupContainer);

        document.addEventListener('keydown', this.#removeOnEsc);

        this.#popupComponent.setCloseBtnClickHandler(() => {
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
