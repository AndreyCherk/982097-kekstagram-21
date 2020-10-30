'use strict';

window.load(window.pictures.loadPictures, window.pictures.errorLoadPictures);
const uploadFileInput = document.querySelector(`.img-upload__input`);

window.uploadFormImageSettings.getDefaultEffectSettings();
window.uploadFormImageSettings.getDefaultScaleSettings();

uploadFileInput.addEventListener(`change`, () => {
  window.uploadForm.renderUploadPopup();
  window.uploadForm.openUploadPopup();
});
