'use strict';

(() => {
  const PHOTO_MAX_QUANTITY = 25;

  const picturesContainer = document.querySelector(`.pictures`);

  const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const renderPicture = (picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = picture.url;
    pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;

    pictureElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.fullSizePicture.renderFullSizePicture(picture);
      window.fullSizePicture.openFullSizePicture();
    });

    return pictureElement;
  };

  const renderPictures = (pictures) => {
    const fragment = document.createDocumentFragment();

    const picturesQuantity = (pictures.length <= PHOTO_MAX_QUANTITY) ? pictures.length : PHOTO_MAX_QUANTITY;
    console.log(picturesQuantity);

    for (let i = 0; i < picturesQuantity; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  const body = document.querySelector(`body`);


  const errorRenderPictures = (errorMessageText) => {
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
    renderPictures,
    errorRenderPictures,
  };

})();
