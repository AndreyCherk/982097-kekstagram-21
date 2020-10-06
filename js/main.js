'use strict';

const COMMENT_AUTHORS_MAMES = [`Анна`, `Евгений`, `Петр`, `Павел`, `Анастасия`, `Эдуард`, `Ольга`];
const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const COMMENTS_QUANTITY = 4;
const PHOTO_QUANTITY = 25;

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

const getComment = () => {
  return {
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayItem(COMMENTS),
    name: getRandomArrayItem(COMMENT_AUTHORS_MAMES),
  };
};

const getComments = (quantity) => {
  const comments = [];

  for (let i = 0; i < quantity; i++) {
    comments[i] = getComment();
  }

  return comments;
};

const getPhoto = (src) => {
  return {
    url: `photos/${src}.jpg`,
    description: `Описание фотографии`,
    likes: getRandomInteger(15, 200),
    comments: getComments(COMMENTS_QUANTITY),
  };
};

const getPhotos = (quantity) => {
  const photos = [];

  for (let i = 0; i < quantity; i++) {
    photos[i] = getPhoto(i + 1);
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
