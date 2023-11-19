import {isEscapeKey} from './util.js';

const dataErroreElement = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');
const successMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');
const REMOBE_MESSAGE_TIMEOUTE = 5000;

const showDataErroreMessande = () => {
  document.body.append (dataErroreElement);
  setTimeout (() => {
    dataErroreElement.remove();
  }, REMOBE_MESSAGE_TIMEOUTE);
};

const hideMessageForm = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
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

const onMessageBtnCloseClick = () => {
  hideMessageForm();
};

const showMessageForm = (element, classBtn) => {
  document.body.append(element);
  element.querySelector(classBtn).addEventListener('click', onMessageBtnCloseClick);
  document.addEventListener('mousedown', onDocumentMousedown);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessageForm = () => {
  showMessageForm(successMessageElement, '.success__button');
};

const showErrorMessageForm = () => {
  showMessageForm(errorMessageElement, '.error__button');
};


export {showDataErroreMessande, showSuccessMessageForm, showErrorMessageForm};
