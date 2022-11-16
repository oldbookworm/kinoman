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
    const arrLength = getRandomInteger(1, +maxLength);
    const shuffledArr = shuffle(arr);
    const newArr = [];
    for (let i = 0; i <= arrLength; i++) {
     newArr.push(shuffledArr[i]);
    }
    return newArr;
};

const convertTiming = (mins) => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return `${hours}h ${minutes}m`;
}


export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray, convertTiming};
