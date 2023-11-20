import { getRandomInteger} from './util.js';
import {renderPictures} from './miniature.js';
import {pictures} from './main.js';
const pictureListElement = document.querySelector('.pictures');
const imgFiltersSection = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const filtersBtn = imgFiltersSection.querySelectorAll('.img-filters__button');

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
  for (let i = 1; newArrayPhotos.length <= 9; i++) {
    const idPhoto = getRandomInteger(0, 24);
    if (newArrayPhotos.indexOf(pictures[idPhoto]) === -1) {
      newArrayPhotos.push(pictures[idPhoto]);
    }
  }
  renderPictures(newArrayPhotos);
};
const sortUserImagesDiscussed = () => {
  const newArrayPhotos = pictures;
  newArrayPhotos.sort(compareComments);
  renderPictures(newArrayPhotos);
};

const sortUserImagesDefault = () => {
  renderPictures(pictures);
};

const sortUserImages = (target) => {
  pictureListElement.querySelectorAll('.picture').forEach((Element) => {
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

const setfilterBtnClick = (cb) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const target = evt.target;
    for (let i = 0; i <= filtersBtn.length - 1; i++) {
      filtersBtn[i].classList.remove('img-filters__button--active');
    }
    target.classList.add('img-filters__button--active');
    cb(target);
  }
  );
};
export {showImgFiltersSection, setfilterBtnClick, sortUserImages};
