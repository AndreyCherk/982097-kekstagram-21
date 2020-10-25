'use strict';

(() => {
  const body = document.querySelector(`body`);
  const loadPictures = (pictures) => {
    window.picturesRendering.renderPictures(pictures);
    window.picturesFilters.activateFilters(pictures);
  };

  const errorLoadPictures = (errorMessageText) => {
    const errorMessage = document.createElement(`div`);
    const errorImage = document.createElement(`img`);
    const errorText = document.createElement(`span`);

    errorImage.src = `img/icon-warning.svg`;
    errorImage.style = `width: 30px; height: 30px; margin-right: 20px; vertical-align: bottom;`;

    errorText.textContent = errorMessageText;

    errorMessage.style = `position: absolute; top: 10px; right: 0; left: 0; padding: 10px; font-family: "Open Sans", "Arial", sans-serif; text-align: center; font-weight: 700; font-size: 20px; color: #ffe753; background-color: #3c3614; border-radius: 10px;`;
    errorMessage.classList.add(`container`);

    errorMessage.appendChild(errorImage);
    errorMessage.appendChild(errorText);

    body.appendChild(errorMessage);
  };

  window.pictures = {
    loadPictures,
    errorLoadPictures,
  };

})();
