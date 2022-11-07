import UserProfileView from './view/user-profile-view';
import MainNavView from './view/main-nav-view';
import SortView from './view/sort-view';
import StatisticsView from './view/statistics-view';
import {render} from './render.js';

import FilmsListPresenter from './presenter/films-list-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsListPresenter = new FilmsListPresenter();
const popupPresenter = new PopupPresenter();

render(new UserProfileView(), siteHeaderElement);
render(new MainNavView(), siteMainElement);
render(new SortView(), siteMainElement);

filmsListPresenter.init(siteMainElement);
popupPresenter.init(siteMainElement);

render(new StatisticsView(), siteFooterElement);


