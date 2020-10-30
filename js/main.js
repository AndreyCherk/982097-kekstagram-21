'use strict';

const TIMEOUT_IN_MS = 10000;
const serverDownloadURL = `https://21.javascript.pages.academy/kekstagram/data`;

window.load(serverDownloadURL, `GET`, window.pictures.loadPictures, window.pictures.errorLoadPictures, TIMEOUT_IN_MS);
const uploadFileInput = document.querySelector(`.img-upload__input`);

window.uploadFormImageSettings.getDefaultEffectSettings();
window.uploadFormImageSettings.getDefaultScaleSettings();

uploadFileInput.addEventListener(`change`, () => {
  window.uploadForm.renderUploadPopup();
  window.uploadForm.openUploadPopup();
});
