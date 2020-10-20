'use strict';
(() => {
  window.pictures.renderPictures(window.data.pictures);

  const uploadFileInput = document.querySelector(`.img-upload__input`);

  uploadFileInput.addEventListener(`change`, () => {
    window.uploadForm.renderUploadPopup();
    window.uploadForm.openUploadPopup();
  });
})();
