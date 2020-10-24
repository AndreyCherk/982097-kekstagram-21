'use strict';
(() => {
  window.load(window.pictures.renderPictures, window.pictures.errorRenderPictures);

  const uploadFileInput = document.querySelector(`.img-upload__input`);

  window.uploadFormImageSettings.getDefaultEffectSettings();
  window.uploadFormImageSettings.getDefaultScaleSettings();

  uploadFileInput.addEventListener(`change`, () => {
    window.uploadForm.renderUploadPopup();
    window.uploadForm.openUploadPopup();
  });
})();
