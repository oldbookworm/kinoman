import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray} from '../util.js';

import {TITLES, SLOGANS, POSTERS, AGE_RATINGS, ACTORS, DIRECTORS, WRITERS, RELEASE_COUNTRY, GENRES} from './mock-data.js';

import dayjs from 'dayjs';

const MIN_RATING = 2;
const MAX_RATING = 10;
const MAX_WRITERS_COUNT = 3;
const MAX_ACTORS_COUNT = 5;
const MIN_RUNTIME = 40;
const MAX_RUNTIME = 150;
const MAX_GENRES_COUNT = 2;
const FISH_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.';

const FILMS_COUNT = 5;

export const generateFilm = () => {
  return {
    title: getRandomArrayElement(TITLES),
    alternativeTitle: getRandomArrayElement(SLOGANS),
    totalRating: getRandomFloat(MIN_RATING, MAX_RATING),
    poster: getRandomArrayElement(POSTERS),
    ageRating: getRandomArrayElement(AGE_RATINGS),
    director: getRandomArrayElement(DIRECTORS),
    writers: getRandomArray(WRITERS, MAX_WRITERS_COUNT),
    actors: getRandomArray(ACTORS, MAX_ACTORS_COUNT),
    release: {
      releaseDate: dayjs().year(getRandomInteger(2000, 2022)).format('YYYY'),
      releaseCountry: getRandomArrayElement(RELEASE_COUNTRY),
    },
    runtime: getRandomInteger(MIN_RUNTIME, MAX_RUNTIME),
    genre: getRandomArray(GENRES, MAX_GENRES_COUNT),
    description: FISH_DESCRIPTION,
  };
};

export const generateFilms = () => {
  const films = Array.from({length: FILMS_COUNT}, generateFilm);

  return films.map((film, index) => {
    return {
      id: String(index + 1),
      filmInfo: film,
    };
  });
};


