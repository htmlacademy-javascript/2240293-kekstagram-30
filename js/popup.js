import {isEscapeKey} from './util.js';
import {data} from'./data.js';
const bigPicture = document.querySelector('.big-picture'); //Окно фотографии
const picturesContainer = document.querySelector('.pictures'); //Миниатюра фотографий
const bigPictureBtnClose = document.querySelector('.big-picture__cancel'); //Кнопка закрытия окна фотографии
const body = document.querySelector('body');
const commentCountDisplayed = document.querySelector('.social__comment-shown-count');
const commentCountALL = document.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');


let arreyComents = [];
let counterDisplayedComments = 0;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.classList.remove('hidden');
  counterDisplayedComments = 0;
  arreyComents = [];
  socialComments.innerHTML = '';
};

const onbigPictureBtnCloseClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const creatingCommentElements = (pictureData) => {
  const comments = pictureData.comments;
  comments.map((comment) => {
    let a = `<li class="social__comment">
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>`;
    a = new DOMParser().parseFromString(a, 'text/html').getElementsByTagName('li')[0];
    arreyComents.push(a);
  });
};

const fillBigPicture = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.social__likes').textContent = pictureData.likes;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  bigPicture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;
};

const renderCommentsBigPicture = () => {
  const maxCounter = counterDisplayedComments + 5;
  const elemetComment = arreyComents.slice(counterDisplayedComments, maxCounter);
  elemetComment.forEach((item, i) => {
    socialComments.append(elemetComment[i]);
    counterDisplayedComments += 1;
  });
  if (counterDisplayedComments === arreyComents.length) {
    commentsLoader.classList.add('hidden');
  }
  commentCountDisplayed.textContent = counterDisplayedComments;
  commentCountALL.textContent = arreyComents.length;
};
//2й вариант
// const renderCommentsBigPicture2 = () => {
//   let localCommentsCount;
//   if (arreyComents.length - counterDisplayedComments <= 5) {
//     localCommentsCount = arreyComents.length;
//     commentsLoader.classList.add('hidden');
//   } else {
//     localCommentsCount = counterDisplayedComments + 5;
//   }

//   for (let i = counterDisplayedComments; i < localCommentsCount; i++) {
//     socialComments.append(arreyComents[counterDisplayedComments]);
//     counterDisplayedComments += 1;
//   }
//   commentCountDisplayed.textContent = counterDisplayedComments;
//   commentCountALL.textContent = arreyComents.length;
// };

const onPicturesContainerClick = (event) =>{
  const targetId = event.target.parentNode.id;
  const pictureData = data.find((element) => element.id === Number(targetId));
  if (event.target.classList[0] === 'picture__img'){
    openBigPicture();
  }
  fillBigPicture(pictureData);
  creatingCommentElements(pictureData);
  renderCommentsBigPicture();
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

bigPictureBtnClose.addEventListener('click', onbigPictureBtnCloseClick);

commentsLoader.addEventListener('click', renderCommentsBigPicture);
