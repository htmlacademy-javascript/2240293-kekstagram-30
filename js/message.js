import {isEscapeKey} from './util.js';

const REMOVE_MESSAGE_TIMEOUT = 5000;
const InformationMessageButtonClass = {
  SUCCESS: '.success__button',
  ERROR: '.error__button'
};

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

const showDataErrorMessage = () => {
  document.body.append (dataError);
  setTimeout (() => {
    dataError.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const hideMessageForm = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);// Функции взаимосвязаны и от перемены места ошибка линта не исчезнет, поэтому для 2х  функций  изменен способ обьявления
  document.removeEventListener('mousedown', onDocumentMousedown);// Функции взаимосвязаны и от перемены места ошибка линта не исчезнет, поэтому для 2х функций  изменен способ обьявления
};

function onDocumentMousedown(evt) {
  if (evt.target.className === 'success' || evt.target.className === 'error') {
    hideMessageForm();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessageForm();
  }
}

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

export {showDataErrorMessage, showSuccessMessageForm, showErrorMessageForm};
