import {getRandomInteger, getRandomArrayElement, beautifyCommentDate} from '../util/util.js';
import {COMMENTS_AUTHORS, COMMENTS, COMMENT_EMOTIONS, FILMS_COUNT} from './mock-data.js';

import dayjs from 'dayjs';

const MAX_COMMENTS = 5;

const getCommentDate = () => {
  const randomDate = dayjs().subtract(getRandomInteger(0, 30), 'day').toDate();
  return beautifyCommentDate(randomDate);
};

export const generateComment = (id) => {
  return {
    id,
    author: getRandomArrayElement(COMMENTS_AUTHORS),
    comment: getRandomArrayElement(COMMENTS),
    date: getCommentDate(),
    emotion: getRandomArrayElement(COMMENT_EMOTIONS)
  };
};


export const generateComments = () => {
  const allComments = [];

  for(let i = 0; i < FILMS_COUNT; i++) {

    const isComments = getRandomInteger(0, 1);

    if (isComments) {
      const commentsCount = getRandomInteger(1, MAX_COMMENTS);

      for(let j = 0; j < commentsCount; j++ ) {
        let comment = generateComment(i + 1);
        allComments.push(comment);
      }
    }

  }
  return allComments;
};



