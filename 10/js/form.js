import {isEscapeKey} from './util.js';
const inputUpload = document.querySelector('.img-upload__input');
const modalImageEditor = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const modalImageEditorBtnClose = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const comment = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');
const imgPreview = document.querySelector('.img-upload__preview');
const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const hashtag = /^#[a-zA-Zа-яёА-ЯЁ0-9]{1,19}$/;

const activeElement = () => document.activeElement === comment ||
  document.activeElement === hashtags;
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !activeElement()) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    modalImageEditor.classList.add('hidden');
    inputUpload.value = null;
    form.reset();
    imgPreview.style = 'none';
  }
};

inputUpload.onchange = () => {
  modalImageEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  effectLevelSliderContainer.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onModalImageEditorBtnCloseClick = () => {
  modalImageEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  inputUpload.value = null;
  form.reset();
  imgPreview.style = 'none';
  document.removeEventListener('keydown', onDocumentKeydown);
};

modalImageEditorBtnClose.addEventListener('click', onModalImageEditorBtnCloseClick);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

const validateComment = (value) => {
  if(value.length <= 140) {
    return true;
  }
  return false;
};

const turnArrayHashtags = () => hashtags.value.split(' ');

const checksNumberHashtags = () => {
  const arrayHashtags = turnArrayHashtags();
  return arrayHashtags.length <= 5;
};
const checksValidityHashtag = () => {
  if (hashtags.value.length === 0) {
    return true;
  }

  const arrayHashtags = turnArrayHashtags();
  let bul = true;
  arrayHashtags.forEach((element) => {
    if (!hashtag.test(element)){
      bul = false;
    }
  });

  return bul;
};
const checksHashtagsForRepetition = () => {
  const arrayHashtags = turnArrayHashtags();
  const newArrayHashtags = [];
  let bul = true;
  arrayHashtags.forEach((element) => {
    if (newArrayHashtags.indexOf(element.toLowerCase()) !== -1) {
      bul = false;
    } else {
      newArrayHashtags.push(element.toLowerCase());
    }
  });
  return bul;
};

pristine.addValidator(comment, validateComment, 'Длина комментария больше 140 символов', 1, false);
pristine.addValidator(hashtags,checksNumberHashtags, 'Превышено количество хэш-тегов', 3, false);
pristine.addValidator(hashtags,checksValidityHashtag, 'Введён невалидный хэш-тег', 1, false);
pristine.addValidator(hashtags,checksHashtagsForRepetition, 'Хэш-теги повторяются', 2, false);


form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
