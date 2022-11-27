import UserProfileView from './view/user-profile-view';
import MainNavView from './view/main-nav-view';
import StatisticsView from './view/statistics-view';
import {render} from './render.js';

import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

render(new UserProfileView(), siteHeaderElement);
render(new MainNavView(), siteMainElement);


filmsPresenter.init();

render(new StatisticsView(), siteFooterElement);






