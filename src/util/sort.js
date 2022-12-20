import dayjs from "dayjs";

const sortType = {
	DEFAULT: 'default',
	DATE: 'date',
	RATING: 'rating',
};

const sortFilmsByDate = (filmA, filmB) => {
  return filmB.filmInfo.release.releaseDate - filmA.filmInfo.release.releaseDate;
};


const sortFilmsByRating = (filmA, filmB) => {
	 return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};

export {sortType, sortFilmsByDate, sortFilmsByRating};
