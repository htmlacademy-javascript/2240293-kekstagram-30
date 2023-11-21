import {isEscapeKey} from './util.js';

const dataErrore = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');
const successMessage = document
  .querySelector('#success')
  .content
  .querySelector('.success');
const errorMessage = document
  .querySelector('#error')
  .content
  .querySelector('.error');
const REMOBE_MESSAGE_TIMEOUTE = 5000;

const showDataErroreMessande = () => {
  document.body.append (dataErrore);
  setTimeout (() => {
    dataErrore.remove();
  }, REMOBE_MESSAGE_TIMEOUTE);
};

const hideMessageForm = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('mousedown', onDocumentMousedown);
};

const onDocumentMousedown = (evt) => {
  if (evt.target.className === 'success' || evt.target.className === 'error') {
    hideMessageForm();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessageForm();
  }
};

const onMessageButtonCloseClick = () => {
  hideMessageForm();
};

const showMessageForm = (element, classButton) => {
  document.body.append(element);
  element.querySelector(classButton).addEventListener('click', onMessageButtonCloseClick);
  document.addEventListener('mousedown', onDocumentMousedown);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessageForm = () => {
  showMessageForm(successMessage, '.success__button');
};

const showErrorMessageForm = () => {
  showMessageForm(errorMessage, '.error__button');
};


export {showDataErroreMessande, showSuccessMessageForm, showErrorMessageForm};
