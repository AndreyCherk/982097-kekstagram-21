'use strict';

const COMMENTS_STEP = 5;
const fullSizePicture = document.querySelector(`.big-picture`);
const fullSizePhoto = fullSizePicture.querySelector(`.big-picture__img img`);
const fullSizePictureCloseButton = fullSizePicture.querySelector(`.big-picture__cancel`);
const descriptionPhoto = fullSizePicture.querySelector(`.social__caption`);
const likesCount = fullSizePicture.querySelector(`.likes-count`);
const commentsCount = fullSizePicture.querySelector(`.social__comment-count`);
const commentsList = fullSizePicture.querySelector(`.social__comments`);
const commentTemplate = fullSizePicture.querySelector(`.social__comment`);
const commentsLoader = fullSizePicture.querySelector(`.comments-loader`);

const body = document.querySelector(`body`);

commentsCount.innerHTML = `<span></span>${commentsCount.innerHTML.slice(1)}`;
const shownCommentsQuantity = commentsCount.querySelector(`span`);
const commentsQuantity = commentsCount.querySelector(`.comments-count`);

const renderComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImage = commentElement.querySelector(`img`);

  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentElement.querySelector(`.social__text`).textContent = comment.message;

  return commentElement;
};

const renderComments = (comments) => {
  let shownComments = comments.length;

  comments.forEach((item, i) => {
    let comment = renderComment(item);
    commentsList.appendChild(comment);

    if (i > COMMENTS_STEP - 1) {
      comment.classList.add(`hidden`);
      shownComments -= 1;
    }
  });

  shownCommentsQuantity.textContent = shownComments;
};

const onCommentsLoaderClick = () => {
  const hiddenComments = Array.from(commentsList.querySelectorAll(`.hidden`));

  const сommentsToShow = (hiddenComments.length <= COMMENTS_STEP) ? hiddenComments.length : COMMENTS_STEP;
  for (let i = 0; i < сommentsToShow; i++) {
    hiddenComments[i].classList.remove(`hidden`);
  }

  hiddenComments.splice(0, сommentsToShow);

  if (!hiddenComments.length) {
    commentsLoader.classList.add(`hidden`);
    commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
  }

  shownCommentsQuantity.textContent = +shownCommentsQuantity.textContent + сommentsToShow;
};

const renderFullSizePicture = (picture) => {
  fullSizePhoto.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsQuantity.textContent = picture.comments.length;
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
  window.util.isEscEvent(evt, closeFullSizePicture);
};

const onFullSizePictureCloseButtonClick = () => {
  closeFullSizePicture();
};

const openFullSizePicture = () => {
  fullSizePicture.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onFullSizePictureEscPress);
  fullSizePictureCloseButton.addEventListener(`click`, onFullSizePictureCloseButtonClick);
};

const closeFullSizePicture = () => {
  fullSizePicture.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onFullSizePictureEscPress);
  fullSizePictureCloseButton.removeEventListener(`click`, onFullSizePictureCloseButtonClick);
  commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
};

window.fullSizePicture = {
  render: renderFullSizePicture,
  open: openFullSizePicture,
};
