import UserProfileView from './view/user-profile-view';
import MainNavView from './view/main-nav-view';
import StatisticsView from './view/statistics-view';
import {render} from './framework/render.js';
import { generateFilter } from './mock/filter';
import { getUserStatus } from './util/user';

import MainPresenter from './presenter/main-presenter.js';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const mainPresenter = new MainPresenter(siteMainElement, filmsModel, commentsModel);
const filters = generateFilter(filmsModel.films);
const filmCount = filmsModel.films.length;
const userStatus = getUserStatus(filmsModel.films);


render(new UserProfileView(userStatus), siteHeaderElement);
render(new MainNavView(filters), siteMainElement);


mainPresenter.init();

render(new StatisticsView(filmCount), siteFooterElement);






