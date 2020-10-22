'use strict';
(() => {
  window.load(window.pictures.renderPictures, window.pictures.errorRenderPictures);

  const uploadFileInput = document.querySelector(`.img-upload__input`);

  uploadFileInput.addEventListener(`change`, () => {
    window.uploadForm.renderUploadPopup();
    window.uploadForm.openUploadPopup();
  });
})();
