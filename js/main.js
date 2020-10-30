'use strict';

const TIMEOUT_IN_MS = 10000;
const serverDownloadURL = `https://21.javascript.pages.academy/kekstagram/data`;

window.load(serverDownloadURL, `GET`, window.pictures.load, window.pictures.errorLoad, TIMEOUT_IN_MS);
const uploadFileInput = document.querySelector(`.img-upload__input`);

window.uploadFormImageSettings.getDefaultEffectSettings();
window.uploadFormImageSettings.getDefaultScaleSettings();

uploadFileInput.addEventListener(`change`, () => {
  window.uploadForm.render();
  window.uploadForm.open();
});
