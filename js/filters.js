import { getRandomInteger} from './util.js';
import {renderPictures} from './miniature.js';

const NUMBER_RANDOM_PHOTOS = 10;
const MAX_ID_RANDOM_PHOTOS = 24;

const pictureList = document.querySelector('.pictures');
const imgFiltersSection = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const filtersButton = imgFiltersSection.querySelectorAll('.img-filters__button');

let arrayPhotos = [];

const getArrayPhotosFilter = (pictures) => {
  arrayPhotos = structuredClone(pictures);
};

const showImgFiltersSection = () => {
  imgFiltersSection.classList.remove('img-filters--inactive');
};

const compareComments = (photoA, photoB) => {
  if (photoA.comments.length < photoB.comments.length) {
    return 1;
  }
  if (photoA.comments.length > photoB.comments.length) {
    return -1;
  }
  return 0;
};

const sortUserImagesRandom = () => {
  const newArrayPhotos = [];
  for (let i = 0; newArrayPhotos.length <= NUMBER_RANDOM_PHOTOS - 1; i++) {
    const idPhoto = getRandomInteger(0, MAX_ID_RANDOM_PHOTOS);
    if (newArrayPhotos.indexOf(arrayPhotos[idPhoto]) === -1) {
      newArrayPhotos.push(arrayPhotos[idPhoto]);
    }
  }
  renderPictures(newArrayPhotos);
};

const sortUserImagesDiscussed = () => {
  const newArrayPhotos = structuredClone(arrayPhotos);
  newArrayPhotos.sort(compareComments);
  renderPictures(newArrayPhotos);
};

const sortUserImagesDefault = () => {
  renderPictures(arrayPhotos);
};

const sortUserImages = (target) => {
  pictureList.querySelectorAll('.picture').forEach((Element) => {
    Element.remove();
  });
  if (target.id.endsWith('-random')) {
    sortUserImagesRandom();
  } else if (target.id.endsWith('-discussed')) {
    sortUserImagesDiscussed();
  }else {
    sortUserImagesDefault();
  }
};

imgFiltersForm.addEventListener('mouseup', ({target}) => {
  filtersButton.forEach((element) => element.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
});

const setfilterButtonClick = (сallback) => {
  imgFiltersForm.addEventListener('click', ({target}) => сallback(target));
};

export {showImgFiltersSection, setfilterButtonClick, sortUserImages, getArrayPhotosFilter};
