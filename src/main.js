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

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();


render(new UserProfileView(), siteHeaderElement);
render(new MainNavView(), siteMainElement);

filmsPresenter.init(siteMainElement, filmsModel, commentsModel);


render(new StatisticsView(), siteFooterElement);







