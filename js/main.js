'use strict';

const COMMENT_AUTHORS_MAMES = [`Анна`, `Евгений`, `Петр`, `Павел`, `Анастасия`, `Эдуард`, `Ольга`];
const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const COMMENTS_MIN_QUANTITY = 1;
const COMMENTS_MAX_QUANTITY = 10;
const PHOTO_QUANTITY = 25;
const AVATAR_QUANTITY = 6;
const LIKES_MIN_QUANTITY = 15;
const LIKES_MAX_QUANTITY = 200;

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

const getComment = () => {
  return {
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_QUANTITY)}.svg`,
    message: getRandomArrayItem(COMMENTS),
    name: getRandomArrayItem(COMMENT_AUTHORS_MAMES),
  };
};

const getComments = (quantity) => {
  const comments = [];

  for (let i = 0; i < quantity; i++) {
    comments.push(getComment());
  }

  return comments;
};

const getPhoto = (src) => {
  return {
    url: `photos/${src}.jpg`,
    description: `Описание фотографии`,
    likes: getRandomInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY),
    comments: getComments(getRandomInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY)),
  };
};

const getPhotos = (quantity) => {
  const photos = [];

  for (let i = 1; i <= quantity; i++) {
    photos.push(getPhoto(i));
  }

  return photos;
};

const renderPhoto = (photo, photoTemplate) => {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;

  return photoElement;
};

const renderPhotos = (photos, listElement, photoTemplate) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i], photoTemplate));
  }

  listElement.appendChild(fragment);
};


const pictures = document.querySelector(`.pictures`);

const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const photos = getPhotos(PHOTO_QUANTITY);

renderPhotos(photos, pictures, pictureTemplate);


const clearElement = (element) => {
  const children = element.children;

  for (let i = children.length - 1; i >= 0; i--) {
    element.removeChild(children[i]);
  }
};

const renderComment = (comment, commentTemplate) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImage = commentElement.querySelector(`img`);

  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentElement.querySelector(`.social__text`).textContent = comment.message;

  return commentElement;
};

const renderComments = (comments, listElement, commentTemplate) => {
  clearElement(listElement);

  for (let i = 0; i < comments.length; i++) {
    listElement.appendChild(renderComment(comments[i], commentTemplate));
  }
};

const renderFullSizePhoto = (photo) => {
  fullSizePhoto.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  descriptionPhoto.textContent = photo.description;

  renderComments(photo.comments, commentsList, commentTemplate);
};

const fullSizePicture = document.querySelector(`.big-picture`);
fullSizePicture.classList.remove(`hidden`);

const fullSizePhoto = fullSizePicture.querySelector(`.big-picture__img img`);
const descriptionPhoto = fullSizePicture.querySelector(`.social__caption`);
const likesCount = fullSizePicture.querySelector(`.likes-count`);
const commentsCount = fullSizePicture.querySelector(`.comments-count`);
const commentsList = fullSizePicture.querySelector(`.social__comments`);
const commentTemplate = fullSizePicture.querySelector(`.social__comment`);

renderFullSizePhoto(photos[0]);

const socialCommentCount = fullSizePicture.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

const commentsLoader = fullSizePicture.querySelector(`.comments-loader`);
commentsLoader.classList.add(`hidden`);

const body = document.querySelector(`body`);
body.classList.add(`modal-open`);
