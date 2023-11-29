const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({id, url, description, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.setAttribute('id', id);

  return pictureElement;
};

const renderPictures = (photos) => {
  const pictureListFragment = document.createDocumentFragment();
  photos.forEach((picture) => {
    const pictureElement = createPicture(picture);
    pictureListFragment.appendChild(pictureElement);
  });
  pictureList.appendChild(pictureListFragment);
};

export {renderPictures};
