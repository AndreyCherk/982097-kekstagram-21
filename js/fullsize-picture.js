'use strict';

(() => {
  const fullSizePicture = document.querySelector(`.big-picture`);
  const fullSizePhoto = fullSizePicture.querySelector(`.big-picture__img img`);
  const fullSizePictureClose = fullSizePicture.querySelector(`.big-picture__cancel`);
  const descriptionPhoto = fullSizePicture.querySelector(`.social__caption`);
  const likesCount = fullSizePicture.querySelector(`.likes-count`);
  const commentsCount = fullSizePicture.querySelector(`.comments-count`);
  const commentsList = fullSizePicture.querySelector(`.social__comments`);
  const commentTemplate = fullSizePicture.querySelector(`.social__comment`);

  const body = document.querySelector(`body`);

  const renderComment = (comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImage = commentElement.querySelector(`img`);

    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentElement.querySelector(`.social__text`).textContent = comment.message;

    return commentElement;
  };

  const renderComments = (comments) => {
    window.util.clearElement(commentsList);

    for (let i = 0; i < comments.length; i++) {
      commentsList.appendChild(renderComment(comments[i]));
    }
  };

  const renderFullSizePicture = (picture) => {
    fullSizePhoto.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    descriptionPhoto.textContent = picture.description;

    renderComments(picture.comments);
  };

  const onFullSizePictureEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeFullSizePicture();
    }
  };

  const openFullSizePicture = () => {
    fullSizePicture.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onFullSizePictureEscPress);
    fullSizePictureClose.addEventListener(`click`, closeFullSizePicture);
  };

  const closeFullSizePicture = () => {
    fullSizePicture.classList.add(`hidden`);
    body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onFullSizePictureEscPress);
    fullSizePictureClose.removeEventListener(`click`, closeFullSizePicture);
  };

  window.fullSizePicture = {
    renderFullSizePicture,
    openFullSizePicture,
  };
})();
