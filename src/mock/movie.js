import {getRandomInteger} from '../utils.js';

const titles = [
  'Челюсти',
  'Как я встретил вашу маму',
  'Зловещие мертвецы',
  'Титаник',
  'Крестный отец',
  'Аватар',
  'Круглосуточные тусовщики',
  'Список Шиндлера',
  'Гарри Поттер'
];

const slogans = [
  'Ты больше никогда не войдешь в воду!',
  'Любовная история в обратном порядке',
  'Уникальный опыт ужасающего кошмара',
  'Ничто на Земле не сможет разлучить их',
  'Настоящая сила не может быть дана, она может быть взята...',
  'Это новый мир',
  'Гений. Поэт. Мудозвон',
  'Этот список - жизнь',
  'Путешествие в твою мечту'
];

// const generateDescription = () => {
//   const descriptions = [
//     'Челюсти',
//     'Как я встретил вашу маму',
//     'Зловещие мертвецы',
//     'Титаник',
//     'Крестный отец',
//     'Аватар',
//     'Круглосуточные тусовщики',
//     '',
//     ''
//   ];

//   const randomIndex = getRandomInteger(0, descriptions.length - 1);

//   return descriptions[randomIndex];
// };

const generateId = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  }
}

const generateFilmId = generateId();

export const generateMovie = () => {
  let filmId = generateFilmId();
  return {
  id: filmId,
  title: titles[filmId],
  alternative_title: slogans[filmId],
};
};

let movie = generateMovie();
console.log(movie);


