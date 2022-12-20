import dayjs from 'dayjs';

// получить рандомное число
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// получить рандомное число с плавающей точкой
const getRandomFloat = (a, b, decimal = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(decimal);
};

// получить рандомный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

// тасуем массив
const shuffle = (array) => {
  for(let i = array.length-1; i>0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// получаем массив случайной длины из неповторяющихся значений
const getRandomArray = (arr, maxLength) => {
    const arrLength = getRandomInteger(1, +maxLength - 1);
    const shuffledArr = shuffle(arr);
    const newArr = [];
    for (let i = 0; i <= arrLength; i++) {
     newArr.push(shuffledArr[i]);
    }
    return newArr;
};

// Перевести минуты в минуты и часы
const convertTiming = (mins) => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return `${hours}h ${minutes}m`;
}

// Красивое отображение даты для комментариев
const beautifyCommentDate = (date) => {
  const now = dayjs().format('YYYY/MM/D HH:m');
  const beautifyDate = dayjs(date).format('YYYY/MM/D HH:m');

  const dateDifference = dayjs(beautifyDate).diff(now, 'day');
  const stringifyDiff = String(dateDifference).slice(1);


  if(dateDifference < 0 && dateDifference > -4) {
    return (`${stringifyDiff} ${stringifyDiff == '1' ? 'день' : 'дня'} назад`);
  } else if(dateDifference == '0') {
    return 'Сегодня';
  } else {
    return beautifyDate;
  }
};

// Функция сортировки комментариев
const findComments = (film, comments) => {
  const sortedComments = [...comments].filter((comment) => {
    return film.id === comment.id;
  });
  return sortedComments;
}

// Функция-рандомайзер для кнопок
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};



export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray, convertTiming, beautifyCommentDate, findComments, updateItem};
