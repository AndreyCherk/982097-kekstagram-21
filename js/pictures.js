'use strict';

(() => {
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

    for (let i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  window.pictures = {
    renderPictures,
  };

})();
