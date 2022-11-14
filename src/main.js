import UserProfileView from './view/user-profile-view';
import MainNavView from './view/main-nav-view';
import StatisticsView from './view/statistics-view';
import {render} from './render.js';

import FilmsPresenter from './presenter/films-presenter.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsPresenter = new FilmsPresenter();


render(new UserProfileView(), siteHeaderElement);
render(new MainNavView(), siteMainElement);

filmsPresenter.init(siteMainElement);


render(new StatisticsView(), siteFooterElement);




