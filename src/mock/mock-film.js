import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray} from '../util/util.js';

import {TITLES, SLOGANS, POSTERS, AGE_RATINGS, ACTORS, DIRECTORS, WRITERS, RELEASE_COUNTRY, GENRES, FISH_DESCRIPTION, FILMS_COUNT} from './mock-data.js';

import dayjs from 'dayjs';

const MIN_RATING = 2;
const MAX_RATING = 10;
const MAX_WRITERS_COUNT = 3;
const MAX_ACTORS_COUNT = 5;
const MIN_RUNTIME = 40;
const MAX_RUNTIME = 150;
const MAX_GENRES_COUNT = 1;

const getWatchingDate = () => {
  return dayjs().day(getRandomInteger(1, 365)).month(getRandomInteger(0, 11)).year(getRandomInteger(2020, 2022)).format('D-MM-YYYY');
};


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

  const alreadyWatched = Boolean(getRandomInteger(0, 1));

  return films.map((film, index) => {
    return {
      id: index + 1,
      filmInfo: film,
      userDetails: {
        watchlist: Boolean(getRandomInteger(0, 1)),
        alreadyWatched,
        watchingDate: (alreadyWatched) ? getWatchingDate() : null,
        favorite: Boolean(getRandomInteger(0, 1)),
      }
    };
  });
};





