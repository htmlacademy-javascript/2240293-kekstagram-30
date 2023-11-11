import {isEscapeKey} from './util.js';
import {data} from'./data.js';
const bigPicture = document.querySelector('.big-picture'); //Окно фотографии
const picturesContainer = document.querySelector('.pictures'); //Миниатюра фотографий
const bigPictureBtnClose = document.querySelector('.big-picture__cancel'); //Кнопка закрытия окна фотографии
const body = document.querySelector('body');
const commentCountDisplayed = document.querySelector('.social__comment-shown-count');
const commentCountAll = document.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');


let arrayComents = [];
let socialCommentCounter = 0;

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
  socialCommentCounter = 0;
  arrayComents = [];
  socialComments.innerHTML = '';
};

const onBigPictureBtnCloseClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const creatingCommentElements = (pictureData) => {
  const comments = pictureData.comments;
  comments.forEach(({avatar, name, message}) => {
    let element = `<li class="social__comment">
        <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
        <p class="social__text">${message}</p>
      </li>`;
    element = new DOMParser().parseFromString(element, 'text/html').querySelector('li');
    arrayComents.push(element);
  });
};

const fillBigPicture = ({url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__likes').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
};

const renderCommentsBigPicture = () => {
  const maxCounter = socialCommentCounter + 5;
  const elemetComment = arrayComents.slice(socialCommentCounter, maxCounter);
  elemetComment.forEach((_, i) => {
    socialComments.append(elemetComment[i]);
    socialCommentCounter += 1;
  });
  if (socialCommentCounter === arrayComents.length) {
    commentsLoader.classList.add('hidden');
  }
  commentCountDisplayed.textContent = socialCommentCounter;
  commentCountAll.textContent = arrayComents.length;
};

const onPicturesContainerClick = (event) =>{
  const targetId = event.target.parentNode.id;
  const pictureData = data.find((element) => element.id === Number(targetId));
  if (event.target.classList[0] === 'picture__img'){
    openBigPicture();
    fillBigPicture(pictureData);
    creatingCommentElements(pictureData);
    renderCommentsBigPicture();
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

bigPictureBtnClose.addEventListener('click', onBigPictureBtnCloseClick);

commentsLoader.addEventListener('click', renderCommentsBigPicture);
