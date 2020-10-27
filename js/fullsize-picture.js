'use strict';

(() => {
  const COMMENTS_STEP = 5;
  const fullSizePicture = document.querySelector(`.big-picture`);
  const fullSizePhoto = fullSizePicture.querySelector(`.big-picture__img img`);
  const fullSizePictureClose = fullSizePicture.querySelector(`.big-picture__cancel`);
  const descriptionPhoto = fullSizePicture.querySelector(`.social__caption`);
  const likesCount = fullSizePicture.querySelector(`.likes-count`);
  const commentsCount = fullSizePicture.querySelector(`.comments-count`);
  const commentsList = fullSizePicture.querySelector(`.social__comments`);
  const commentTemplate = fullSizePicture.querySelector(`.social__comment`);
  const commentsLoader = fullSizePicture.querySelector(`.comments-loader`);

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
    for (let i = 0; i < comments.length; i++) {
      let comment = renderComment(comments[i]);
      commentsList.appendChild(comment);

      if (i > COMMENTS_STEP - 1) {
        comment.classList.add(`hidden`);
      }
    }
  };

  const onCommentsLoaderClick = () => {
    const hiddenComments = Array.from(commentsList.querySelectorAll(`.hidden`));

    const сommentsToShow = (hiddenComments.length <= COMMENTS_STEP) ? hiddenComments.length : COMMENTS_STEP;
    for (let i = 0; i < сommentsToShow; i++) {
      hiddenComments[i].classList.remove(`hidden`);
    }

    hiddenComments.splice(0, сommentsToShow);

    if (сommentsToShow !== COMMENTS_STEP) {
      commentsLoader.classList.add(`hidden`);
      commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
    }
  };

  const renderFullSizePicture = (picture) => {
    fullSizePhoto.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    descriptionPhoto.textContent = picture.description;

    window.util.clearElement(commentsList);
    renderComments(picture.comments);

    if (picture.comments.length > COMMENTS_STEP) {
      commentsLoader.classList.remove(`hidden`);
      commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
    } else {
      commentsLoader.classList.add(`hidden`);
    }
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
    commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
  };

  window.fullSizePicture = {
    renderFullSizePicture,
    openFullSizePicture,
  };
})();
