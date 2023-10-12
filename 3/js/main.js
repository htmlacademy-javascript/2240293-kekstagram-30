const NAMES = [
  'Азат',
  'Аарон',
  'Алим',
  'Борис',
  'Бронислав',
  'Варвара',
  'Василиса',
  'Вера',
  'Виталий',
  'Владимир',
  'Григорий',
  'Дарья',
  'Диана',
  'Денис',
  'Митрофан',
  'Михаил',
  'Мария',
  'Марта',
  'Марфа',
  'Оксана',
  'Олеся',
  'Ростислав',
  'Руслан'
];

const PHOTO_CAPTION = [
  'Я думаю, что в моей жизни чего-то не хватает. Вроде бы 2-3 миллиона долларов.',
  'Должен быть праздник, посвященный всем смельчакам, которые приходят на работу по понедельникам.',
  'Моя жизнь — это постоянная борьба между любовью к еде и нежеланием толстеть.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Рано ложусь спать. Не иду на вечеринку. Не выхожу из дома. Как видно наказания в детстве стали моими взрослыми правилами.',
  'Если вам никто не улыбнулся утром, я подарю вам одну из своих.',
  'Оставайся сильным, скоро выходные!',
  '75% моего юмора начинается с плохой фотографии.',
  'Я не толстый. Меня просто легче увидеть, чем всех остальных.',
  'Я не ленивый. Просто у меня нет мотивации.',
  'Шоппинг — это особый вид искусства. Уважайте художника, пожалуйста.',
  'Это моё довольно голодное лицо.'
];

const TEXT_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const CARDS_PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Принципиально хотела, что бы ID  присваивалось по порядковому номеру, покаалось более логичным
function createSequenceNamber () {
  const previousValues = [];

  return function () {
    let currentValue = 0;
    if (previousValues.length === 0) {
      currentValue = 1;
    } else {
      currentValue = previousValues.length + 1;
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const getIdComment = createSequenceNamber();
const getSequenceNamber = createSequenceNamber();

const createComment = () => {
  const idComment = getIdComment();

  return {
    id: idComment,
    message: TEXT_COMMENT[getRandomInteger(0,TEXT_COMMENT.length - 1)],
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    name: NAMES[getRandomInteger(0,NAMES.length - 1)]
  };
};

const createPhoto = () => {
  const sequenceNamber = getSequenceNamber();

  return {
    id: sequenceNamber,
    url: `photos/${sequenceNamber}.jpg`,
    description: PHOTO_CAPTION[getRandomInteger(0, PHOTO_CAPTION.length - 1)],
    likes: getRandomInteger(15, 250),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };
};

const сardsPhoto = Array.from({length: CARDS_PHOTO_COUNT}, createPhoto);

сardsPhoto();
