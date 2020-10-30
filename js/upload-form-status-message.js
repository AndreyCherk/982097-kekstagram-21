'use strict';

const body = document.querySelector(`body`);
const main = body.querySelector(`main`);

const successMessageTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const errorMessageTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

let messageElement;

const closeStatusMessage = () => {
  messageElement.remove();
  document.removeEventListener(`keydown`, onStatusMessageEscPress);
  document.removeEventListener(`click`, onStatusMessageOutsideClick);
};

const onStatusMessageEscPress = (evt) => {
  window.util.isEscEvent(evt, closeStatusMessage);
};

const onStatusMessageOutsideClick = (evt) => {
  if (!evt.target.matches(`[class$="inner"]`)) {
    evt.preventDefault();
    closeStatusMessage();
  }
};

const onStatusButtonClick = () => {
  closeStatusMessage();
};

const openStatusMessage = (status) => {
  if (status === `success`) {
    messageElement = successMessageTemplate.cloneNode(true);
  } else if (status === `error`) {
    messageElement = errorMessageTemplate.cloneNode(true);
  }

  document.addEventListener(`keydown`, onStatusMessageEscPress);
  document.addEventListener(`click`, onStatusMessageOutsideClick);
  messageElement.querySelector(`.${status}__button`).addEventListener(`click`, onStatusButtonClick);
  main.appendChild(messageElement);
};

window.uploadFormStatusMessage = {
  open: openStatusMessage,
};
