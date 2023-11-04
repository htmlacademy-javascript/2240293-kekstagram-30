import {isEscapeKey} from './util.js';
import {data} from'./data.js';
const bigPicture = document.querySelector('.big-picture'); //Окно фотографии
const picturesContainer = document.querySelector('.pictures'); //Миниатюра фотографий
const bigPictureBtnClose = document.querySelector('.big-picture__cancel'); //Кнопка закрытия окна фотографии
const body = document.querySelector('body');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const onbigPictureBtnCloseClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const fillCommentsBigPicture = (pictureData) => {
  const socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';
  const comments = pictureData.comments;
  socialComments.innerHTML = comments.map((comment) =>
    `<li class="social__comment">
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>`
  ).join('');
};

const fillBigPicture = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.social__likes').textContent = pictureData.likes;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  bigPicture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;
};

const onPicturesContainerClick = (event) =>{
  const targetId = event.target.parentNode.id;
  const pictureData = data.find((element) => element.id === Number(targetId));
  if (event.target.classList[0] === 'picture__img'){
    openBigPicture();
  }
  fillBigPicture(pictureData);
  fillCommentsBigPicture(pictureData);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

bigPictureBtnClose.addEventListener('click', onbigPictureBtnCloseClick);
