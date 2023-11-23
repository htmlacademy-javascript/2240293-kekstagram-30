import {isEscapeKey} from './util.js';

const dataError = document
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
const REMOVE_MESSAGE_TIMEOUT = 5000;

const showDataErroreMessage = () => {
  document.body.append (dataError);
  setTimeout (() => {
    dataError.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const InformationMessageButtonClass = {
  SUCCESS: '.success__button',
  ERROR: '.error__button'
};

const hideMessageForm = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);// Функции взаимосвязаны и от перемены места ошибка линта не исчезнет, поэтому для 2х сток остановлена проверка
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('mousedown', onDocumentMousedown);// Функции взаимосвязаны и от перемены места ошибка линта не исчезнет, поэтому для 2х сток остановлена проверка
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
  showMessageForm(successMessage, InformationMessageButtonClass.SUCCESS);
};

const showErrorMessageForm = () => {
  showMessageForm(errorMessage, InformationMessageButtonClass.ERROR);
};


export {showDataErroreMessage, showSuccessMessageForm, showErrorMessageForm};
