const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({url, description, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};

const renderPictures = (data) => {
  const pictureListFragment = document.createDocumentFragment();
  data.forEach((picture) => {
    const pictureElement = createPicture(picture);
    pictureListFragment.appendChild(pictureElement);
  });
  pictureListElement.appendChild(pictureListFragment);
};

export {renderPictures};
