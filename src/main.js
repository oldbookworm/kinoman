import UserProfileView from './view/user-profile-view';
import MainNavView from './view/main-nav-view';
import SortView from './view/sort-view';
import StatisticsView from './view/statistics-view';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new UserProfileView(), siteHeaderElement);
render(new MainNavView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new StatisticsView(), siteFooterElement);


